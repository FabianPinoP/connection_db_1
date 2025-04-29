import { stripe } from '../../config/stripe/stripe.config.js'

const getCheckout = async (req, res) => {
  const { price, quantity, user_email, cart_id } = req.body
  const session = await stripe.checkout.sessions.create({
    customer_email: user_email,
    success_url: 'https://example.com/success', // url de destino del front con pago exitoso
    cancel_url: 'https://example.com/cancel', // url de destino del front con pago fallido
    line_items: [
      {
        price,
        quantity: quantity
      }
    ],
    mode: 'payment',
    metadata: {
      cartId: cart_id
    }
  })
  res.status(200).json({url: session.url})
}

const getProducts = async (req, res) => {
  const products = await stripe.products.list({
    limit: 10,
  })
  res.status(200).json(products)
}

const createProduct = async (req, res) => {
  const { name, description, unit_amount } = req.body
  // antes creo el producto en la db con la respuesta saco el id del producto y lo dejo en la metadata
  // creamos el producto en stripe
  const product = await stripe.products.create({
    name,
    description,
    images: [
      'https://jumbocl.vtexassets.com/arquivos/ids/302795/Whisky-Chivas-12-40%C2%B0-750-cc.jpg?v=638776376340030000'
    ],
  });

  // creamos el precio en stripe para ese producto
  await stripe.prices.create({
    unit_amount, // 25.00 USD (en centavos)
    currency: 'usd',
    product: product.id,
    metadata: {
      productId: 10 // este viene de la respuesta de la db
    }
  });
  res.status(200).json({ message: 'producto creado'})
}
export { getCheckout, getProducts, createProduct }
