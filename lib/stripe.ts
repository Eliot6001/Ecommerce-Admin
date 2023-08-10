import { env } from "process"
import Stripe from "stripe"

export const stripe = new Stripe(env.STRIPE_API!, {
    apiVersion:"2022-11-15",
    typescript: true
})