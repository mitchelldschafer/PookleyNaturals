import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type CartItem = {
    id: string;
    productId: string;
    quantity: number;
    // We'll store basic details to avoid fetching if possible,
    // but for now relying on backend fetching or separate lookup
    // If backend doesn't return joined product data (because it's Sanity source),
    // we might need to fetch product details on the frontend.
    // For V1, let's assume we fetch product details by ID if needed.
    product?: any;
};

type Cart = {
    id: string;
    items: CartItem[];
    subtotal: number;
    total: number;
};

type CartContextType = {
    cart: Cart | null;
    isLoading: boolean;
    addItem: (product: any, quantity?: number) => Promise<void>;
    removeItem: (itemId: string) => Promise<void>;
    updateQuantity: (itemId: string, quantity: number) => Promise<void>;
    toggleDrawer: (open?: boolean) => void;
    isDrawerOpen: boolean;
    itemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<Cart | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { toast } = useToast();

    const getCartId = () => localStorage.getItem("cart_id");
    const setCartId = (id: string) => localStorage.setItem("cart_id", id);

    useEffect(() => {
        initializeCart();
    }, []);

    const initializeCart = async () => {
        try {
            let id = getCartId();
            if (!id) {
                // Create new cart
                id = await createNewCart();
            }

            if (id) {
                await fetchCart(id);
            }
        } catch (error) {
            console.error("Failed to initialize cart:", error);
            // If fetch fails (maybe invalid ID), clear and create new
            localStorage.removeItem("cart_id");
            try {
                const newId = await createNewCart();
                await fetchCart(newId);
            } catch (e) {
                console.error("Critical: Failed to recover cart", e);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const createNewCart = async () => {
        const res = await apiRequest("POST", "/api/carts", {
            sessionId: Math.random().toString(36).substring(7),
        });
        const newCart = await res.json();
        setCartId(newCart.id);
        return newCart.id;
    };

    const fetchCart = async (id: string) => {
        try {
            const res = await apiRequest("GET", `/api/carts/${id}`);
            const data = await res.json();

            const items = data.cart_items?.map((item: any) => ({
                id: item.id,
                productId: item.product_id,
                quantity: item.quantity,
                product: item.product || item.products
            })) || [];

            setCart({
                id: data.id,
                items,
                subtotal: 0,
                total: 0
            });
        } catch (error) {
            console.error("Error fetching cart:", error);
            // If the cart doesn't exist anymore, clear local storage so a new one can be created
            localStorage.removeItem("cart_id");
            setCart(null);
        }
    };

    const addItem = async (product: any, quantity = 1) => {
        if (!cart?.id) return;

        try {
            await apiRequest("POST", `/api/carts/${cart.id}/items`, {
                product_id: product._id || product.id,
                quantity,
            });

            // Optimistic update or refetch
            await fetchCart(cart.id);
            setIsDrawerOpen(true);

            toast({
                title: "Added to cart",
                description: `${quantity} x ${product.name} added to your cart.`,
            });
        } catch (error) {
            console.error("Add to cart error:", error);
            toast({
                title: "Error",
                description: "Failed to add item to cart.",
                variant: "destructive",
            });
        }
    };

    const removeItem = async (itemId: string) => {
        if (!cart?.id) return;
        try {
            await apiRequest("DELETE", `/api/carts/${cart.id}/items/${itemId}`);
            await fetchCart(cart.id);
            toast({ title: "Item removed" });
        } catch (error) {
            console.error("Remove item error:", error);
            toast({ title: "Failed to remove item", variant: "destructive" });
        }
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        if (!cart?.id) return;
        if (quantity < 1) return;
        try {
            await apiRequest("PATCH", `/api/carts/${cart.id}/items/${itemId}`, { quantity });
            await fetchCart(cart.id);
        } catch (error) {
            console.error("Update quantity error:", error);
        }
    };

    const toggleDrawer = (open?: boolean) => {
        setIsDrawerOpen(open ?? !isDrawerOpen);
    };

    const itemCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

    return (
        <CartContext.Provider
            value={{
                cart,
                isLoading,
                addItem,
                removeItem,
                updateQuantity,
                toggleDrawer,
                isDrawerOpen,
                itemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
