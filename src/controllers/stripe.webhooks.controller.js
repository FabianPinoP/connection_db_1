import { findUserByEmail, saveStripeCustomerId } from "../models/usuarios.model.js";

const stripeWebhooks = async (req, res) => {
  const event = req.body;

  switch (event.type) {
    case 'customer.created':
      const data = event.data.object;
      const user = await findUserByEmail(data.email)
      await saveStripeCustomerId(user.id, data.id)
      break;
    case 'checkout.session.completed':
      // aqui buscamos el cart id desde la metadata y con ese id actualizamos el status del carrito a pagado
      console.log(event.data.object);
      break;
    case 'price.created':
      // aqui buscamos el id del producto en la metadata hacemos una consulta a la db y actualizamos el registro guardando el price id para usarlo en el checkout
      console.log(event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
}

export { stripeWebhooks }

// customer object
// {
//   id: 'cus_SCK1UQsD6mtgf3',
//   object: 'customer',
//   address: null,
//   balance: 0,
//   created: 1745622616,
//   currency: null,
//   default_source: null,
//   delinquent: false,
//   description: '(created by Stripe CLI)',
//   discount: null,
//   email: null,
//   invoice_prefix: '6137E47B',
//   invoice_settings: {
//     custom_fields: null,
//     default_payment_method: null,
//     footer: null,
//     rendering_options: null
//   },
//   livemode: false,
//   metadata: {},
//   name: null,
//   next_invoice_sequence: 1,
//   phone: null,
//   preferred_locales: [],
//   shipping: null,
//   tax_exempt: 'none',
//   test_clock: null
// }


// checkout.session.completed
// {
//   id: 'cs_test_a16OwUEhGxUtDr3TBwQMC1l0lH3vntztt3wsTmk4va8rMP3Lb4bbilabHD',
//   object: 'checkout.session',
//   adaptive_pricing: { enabled: false },
//   after_expiration: null,
//   allow_promotion_codes: null,
//   amount_subtotal: 600,
//   amount_total: 600,
//   automatic_tax: { enabled: false, liability: null, provider: null, status: null },
//   billing_address_collection: null,
//   cancel_url: 'https://example.com/cancel',
//   client_reference_id: null,
//   client_secret: null,
//   collected_information: { shipping_details: null },
//   consent: null,
//   consent_collection: null,
//   created: 1745627752,
//   currency: 'usd',
//   currency_conversion: null,
//   custom_fields: [],
//   custom_text: {
//     after_submit: null,
//     shipping_address: null,
//     submit: null,
//     terms_of_service_acceptance: null
//   },
//   customer: null,
//   customer_creation: 'if_required',
//   customer_details: {
//     address: {
//       city: null,
//       country: 'CL',
//       line1: null,
//       line2: null,
//       postal_code: null,
//       state: null
//     },
//     email: 'claudio@test.com',
//     name: 'Paz Arancibia',
//     phone: null,
//     tax_exempt: 'none',
//     tax_ids: []
//   },
//   customer_email: 'claudio@test.com',
//   discounts: [],
//   expires_at: 1745714152,
//   invoice: null,
//   invoice_creation: {
//     enabled: false,
//     invoice_data: {
//       account_tax_ids: null,
//       custom_fields: null,
//       description: null,
//       footer: null,
//       issuer: null,
//       metadata: {},
//       rendering_options: null
//     }
//   },
//   livemode: false,
//   locale: null,
//   metadata: { cartId: '12' },
//   mode: 'payment',
//   payment_intent: 'pi_3RHwj0Rq9KdVRiuy1ZIGzjjg',
//   payment_link: null,
//   payment_method_collection: 'if_required',
//   payment_method_configuration_details: { id: 'pmc_1RHw7QRq9KdVRiuyMul0JN6N', parent: null },
//   payment_method_options: { card: { request_three_d_secure: 'automatic' } },
//   payment_method_types: [ 'card', 'link', 'cashapp' ],
//   payment_status: 'paid',
//   permissions: null,
//   phone_number_collection: { enabled: false },
//   recovered_from: null,
//   saved_payment_method_options: null,
//   setup_intent: null,
//   shipping_address_collection: null,
//   shipping_cost: null,
//   shipping_details: null,
//   shipping_options: [],
//   status: 'complete',
//   submit_type: null,
//   subscription: null,
//   success_url: 'https://example.com/success',
//   total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
//   ui_mode: 'hosted',
//   url: null,
//   wallet_options: null
// }

// price.created
// {
//   id: 'price_1RHx44Rq9KdVRiuyii7Liulr',
//   object: 'price',
//   active: true,
//   billing_scheme: 'per_unit',
//   created: 1745629076,
//   currency: 'usd',
//   custom_unit_amount: null,
//   livemode: false,
//   lookup_key: null,
//   metadata: { productId: '10' },
//   nickname: null,
//   product: 'prod_SCLlftCbQUB6Zt',
//   recurring: null,
//   tax_behavior: 'unspecified',
//   tiers_mode: null,
//   transform_quantity: null,
//   type: 'one_time',
//   unit_amount: 20000,
//   unit_amount_decimal: '20000'
// }
