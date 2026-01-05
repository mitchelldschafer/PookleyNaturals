import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-02-24.acacia',
    typescript: true,
});

// Helper to create a checkout session
export async function createCheckoutSession(params: {
    cartItems: Array<{
        product: {
            _id: string;
            name: string;
            price: number;
            salePrice?: number;
            images?: any[];
        };
        quantity: number;
    }>;
    customerEmail?: string;
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, string>;
}) {
    const { cartItems, customerEmail, successUrl, cancelUrl, metadata } = params;

    const lineItems = cartItems.map((item) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.product.name,
                metadata: {
                    product_id: item.product._id,
                },
            },
            unit_amount: Math.round((item.product.salePrice || item.product.price) * 100), // Convert to cents
        },
        quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer_email: customerEmail,
        metadata: metadata,
        shipping_address_collection: {
            allowed_countries: ['US', 'CA'],
        },
        billing_address_collection: 'required',
    });

    return session;
}

// Helper to verify webhook signature
export function constructWebhookEvent(
    payload: string | Buffer,
    signature: string,
    webhookSecret: string
) {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

// Helper to retrieve a payment intent
export async function getPaymentIntent(paymentIntentId: string) {
    return stripe.paymentIntents.retrieve(paymentIntentId);
}

// Helper to create a refund
export async function createRefund(paymentIntentId: string, amount?: number) {
    return stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount, // Optional: partial refund amount in cents
    });
}
