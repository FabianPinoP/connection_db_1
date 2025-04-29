import express from "express";
import { stripeWebhooks } from "../src/controllers/stripe.webhooks.controller.js";
const router = express.Router();

router.post('/webhook', stripeWebhooks)
export default router;