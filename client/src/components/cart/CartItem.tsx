import { Minus, Plus, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/lib/CartContext";
import { apiRequest } from "@/lib/queryClient";

type CartItemProps = {
    item: {
        id: string; // cart_item id
        productId: string;
        quantity: number;
    };
};

export function CartItem({ item }: CartItemProps) {
    const { removeItem, updateQuantity } = useCart();

    const { data: product, isLoading } = useQuery({
        queryKey: ["product", item.productId],
        queryFn: async () => {
            const res = await apiRequest("GET", `/api/sanity/products/id/${item.productId}`);
            return res.json();
        },
    });

    if (isLoading) {
        return (
            <div className="flex gap-4 py-4">
                <Skeleton className="h-20 w-20 rounded-md" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
        );
    }

    if (!product) return null;

    return (
        <div className="flex gap-4 py-4 border-b border-neutral-100 last:border-0">
            <Link href={`/product/${product.slug.current}`}>
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200 cursor-pointer">
                    <img
                        src={product.images?.[0]?.url}
                        alt={product.name}
                        className="h-full w-full object-cover"
                    />
                </div>
            </Link>

            <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between">
                    <Link href={`/product/${product.slug.current}`}>
                        <h3 className="font-medium hover:underline cursor-pointer">{product.name}</h3>
                    </Link>
                    <p className="font-medium text-neutral-900">${product.price}</p>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 border border-neutral-200 rounded-md">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-neutral-500 hover:text-red-500"
                        onClick={() => removeItem(item.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
