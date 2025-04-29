import Stripe from 'stripe';
import { envs } from '../envs.js';
const stripe = new Stripe(envs.stripeApiKey);

export { stripe }