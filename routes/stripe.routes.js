import express from "express";
import { createProduct, getCheckout, getProducts } from "../src/controllers/stripe.controller.js";

const router = express.Router();

router.post('/create_checkout', getCheckout)
router.get('/stripe_products', getProducts)
router.post('/create_product', createProduct)
export default router;

