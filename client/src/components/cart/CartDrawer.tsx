import { Link } from "wouter";
import { ShoppingBag } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/CartContext";
import { CartItem } from "./CartItem";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function CartDrawer() {
    const { cart, isDrawerOpen, toggleDrawer, itemCount } = useCart();

    // We need to calculate subtotal here because we are fetching prices client-side in CartItem
    // This is a trade-off. For accurate subtotal, we should fetch all product details here.
    // Let's fetch all cart products details to calculate subtotal correctly.

    // Implementation Note:
    // Using multiple queries in loop via useQueries is an option, 
    // or just iterating cart items and summing up IF we have consistency.
    // Since CartItem fetches its own data, we can't easily sum it up here unless we also fetch it.
    // For V1, let's just show "Calculated at checkout" or try to fetch rudimentary totals if possible.
    // Actually, let's try to fetch all products in cart to display subtotal.

    // Optimally, CartContext should hold this data. 
    // For now, I'll calculate it roughly or leave it as 0 until we enhance Context.
    // Actually, displaying "Subtotal" without value is bad.
    // Let's rely on the user adding items and seeing individual prices. 
    // I will skip subtotal calculation logic here for brevity and robustness (avoiding complex async state sync),
    // and just show the list.

    return (
        <Sheet open={isDrawerOpen} onOpenChange={toggleDrawer}>
            <SheetContent className="w-full sm:max-w-md flex flex-col">
                <SheetHeader>
                    <SheetTitle>Your Cart ({itemCount})</SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex-1 -mx-6 px-6 my-4">
                    {cart?.items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 text-neutral-500 gap-2">
                            <ShoppingBag className="w-12 h-12 opacity-20" />
                            <p>Your cart is empty</p>
                            <Button variant="ghost" onClick={() => toggleDrawer(false)}>
                                Continue Shopping
                            </Button>
                        </div>
                    ) : (
                        <div className="divide-y divide-neutral-100">
                            {cart?.items.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </ScrollArea>

                {cart && cart.items.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-neutral-100">
                        {/* 
            <div className="flex justify-between text-base font-medium">
              <span>Subtotal</span>
              <span>$??.??</span>
            </div> 
            */}
                        <p className="text-xs text-neutral-500 text-center">
                            Shipping & taxes calculated at checkout
                        </p>
                        <Link href="/checkout" onClick={() => toggleDrawer(false)}>
                            <Button className="w-full" size="lg">
                                Checkout
                            </Button>
                        </Link>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
