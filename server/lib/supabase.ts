import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL) {
    throw new Error('Missing SUPABASE_URL environment variable');
}

if (!process.env.SUPABASE_SERVICE_KEY) {
    throw new Error('Missing SUPABASE_SERVICE_KEY environment variable');
}

// Server-side Supabase client with service role key
export const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);

// Cart operations
export const cartOperations = {
    // Create a new cart
    createCart: async (userId?: string) => {
        const { data, error } = await supabase
            .from('carts')
            .insert({
                user_id: userId,
                status: 'active',
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Get cart by ID
    getCart: async (cartId: string) => {
        const { data, error } = await supabase
            .from('carts')
            .select(
                `
        *,
        cart_items (
          *,
          product:product_id (*)
        )
      `
            )
            .eq('id', cartId)
            .single();

        if (error) throw error;
        return data;
    },

    // Add item to cart
    addToCart: async (cartId: string, productId: string, quantity: number) => {
        // Check if item already exists in cart
        const { data: existingItem } = await supabase
            .from('cart_items')
            .select('*')
            .eq('cart_id', cartId)
            .eq('product_id', productId)
            .single();

        if (existingItem) {
            // Update quantity if item exists
            const { data, error } = await supabase
                .from('cart_items')
                .update({ quantity: existingItem.quantity + quantity })
                .eq('id', existingItem.id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } else {
            // Insert new item
            const { data, error } = await supabase
                .from('cart_items')
                .insert({
                    cart_id: cartId,
                    product_id: productId,
                    quantity,
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        }
    },

    // Update cart item quantity
    updateCartItem: async (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            return cartOperations.removeCartItem(itemId);
        }

        const { data, error } = await supabase
            .from('cart_items')
            .update({ quantity })
            .eq('id', itemId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Remove item from cart
    removeCartItem: async (itemId: string) => {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', itemId);

        if (error) throw error;
        return { success: true };
    },

    // Clear cart
    clearCart: async (cartId: string) => {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('cart_id', cartId);

        if (error) throw error;
        return { success: true };
    },
};

// Order operations
export const orderOperations = {
    // Create order
    createOrder: async (orderData: {
        cart_id: string;
        customer_email: string;
        customer_name: string;
        shipping_address: any;
        total_amount: number;
        stripe_payment_intent_id?: string;
    }) => {
        const { data, error } = await supabase
            .from('orders')
            .insert(orderData)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Create order items from cart
    createOrderItems: async (orderId: string, cartItems: any[]) => {
        const orderItems = cartItems.map((item) => ({
            order_id: orderId,
            product_id: item.product_id,
            quantity: item.quantity,
            price_at_purchase: item.product.price,
        }));

        const { data, error } = await supabase
            .from('order_items')
            .insert(orderItems)
            .select();

        if (error) throw error;
        return data;
    },

    // Get order by ID
    getOrder: async (orderId: string) => {
        const { data, error } = await supabase
            .from('orders')
            .select(
                `
        *,
        order_items (
          *,
          product:product_id (*)
        )
      `
            )
            .eq('id', orderId)
            .single();

        if (error) throw error;
        return data;
    },

    // Update order status
    updateOrderStatus: async (orderId: string, status: string) => {
        const { data, error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', orderId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },
};
