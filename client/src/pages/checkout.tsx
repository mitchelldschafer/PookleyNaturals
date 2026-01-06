
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation, useRoute } from "wouter";
import { useCart } from "@/lib/CartContext";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const shippingSchema = z.object({
    email: z.string().email("Invalid email address"),
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    address1: z.string().min(5, "Address is required"),
    address2: z.string().optional(),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    zipCode: z.string().min(5, "ZIP code is required"),
    phone: z.string().optional(),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

export default function Checkout() {
    const { cart, isLoading: isCartLoading } = useCart();
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ShippingFormValues>({
        resolver: zodResolver(shippingSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipCode: "",
            phone: "",
        },
    });

    const onSubmit = async (data: ShippingFormValues) => {
        if (!cart) return;

        setIsSubmitting(true);
        try {
            const orderData = {
                cart_id: cart.id, // Using the cart id from nested structure if needed, or check CartContext type
                customer_email: data.email,
                customer_name: `${data.firstName} ${data.lastName}`,
                customer_phone: data.phone,
                shipping_address: {
                    line1: data.address1,
                    line2: data.address2,
                    city: data.city,
                    state: data.state,
                    postal_code: data.zipCode,
                    country: "US", // Defaulting to US for V1
                },
                use_shipping_as_billing: true,
            };

            const res = await apiRequest("POST", "/api/orders", orderData);

            if (res.ok) {
                const order = await res.json();
                // Redirect to order confirmation (or success page)
                // For now, let's just show success and maybe redirect home or clear cart visual
                toast({
                    title: "Order placed successfully!",
                    description: `Order #${order.order_number} has been created.`,
                });

                // In a real app we'd redirect to payment or success page
                // setLocation(`/order/${order.id}`); // Future
                setLocation("/");
            } else {
                throw new Error("Failed to create order");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast({
                title: "Checkout failed",
                description: "There was a problem processing your order. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isCartLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-12 px-6">
                <div className="max-w-md mx-auto text-center space-y-4">
                    <h1 className="font-serif text-3xl text-foreground">Your cart is empty</h1>
                    <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                    <Link href="/shop">
                        <Button size="lg" className="w-full">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Calculate totals for display
    const subtotal = cart.items.reduce((sum, item) => {
        // We might not have price in item if not fetched. 
        // Ideally CartContext fetches it. 
        // Fallback or use item.product.price if available from CartItem fetch logic?
        // Actually, CartContext items usually just have basic data.
        // For V1 display, let's assume we might show "Calculated at next step" or 
        // if CartItem fetches it, we don't have it globally here easily without refetching.
        // Let's iterate and try to access product data if we have it in context, 
        // otherwise effectively 0 for now until context is enhanced.
        const price = item.product?.price || item.product?.salePrice || 0;
        return sum + price * item.quantity;
    }, 0);

    const shipping = subtotal > 50 ? 0 : 10;
    // This is purely estimate for visual. Backend does real calc.

    return (
        <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <Link href="/shop">
                    <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Shop
                    </Button>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Shipping Form */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-100">
                            <h2 className="font-serif text-2xl mb-6">Shipping Information</h2>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="address1"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Street address" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="address2"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Apartment, suite, etc. (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="state"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>State</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="NY" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="zipCode"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>ZIP Code</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full mt-6"
                                        size="lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            "Place Order"
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-100 sticky top-24">
                            <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6">
                                {cart.items.map((item) => (
                                    <div key={item.id} className="flex gap-4 py-2">
                                        <div className="relative w-16 h-16 bg-neutral-100 rounded-md overflow-hidden flex-shrink-0">
                                            {item.product?.images?.[0] ? (
                                                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No img</div>
                                            )}
                                            <span className="absolute -top-2 -right-2 w-5 h-5 bg-neutral-500 text-white text-[10px] rounded-full flex items-center justify-center">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{item.product?.name || "Product"}</p>
                                            <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                                        </div>
                                        <div>
                                            {/* Price display placeholder as we don't always have it in context yet */}
                                            {item.product?.price && (
                                                <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-neutral-500">Subtotal (Estimate)</span>
                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-neutral-500">Shipping</span>
                                    <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-neutral-500">Taxes</span>
                                    <span className="font-medium italic text-xs text-neutral-400">Calc. at next step</span>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="flex justify-between text-lg font-medium">
                                <span>Total</span>
                                {/* Visual approximate total */}
                                <span>${(subtotal + shipping).toFixed(2)}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
