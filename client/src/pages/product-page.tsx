import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { useCart } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
    Loader2,
    ShoppingCart,
    Check,
    ShieldCheck,
    Leaf,
    Heart,
    Star,
    Minus,
    Plus
} from "lucide-react";
import { motion } from "framer-motion";

interface Product {
    _id: string;
    name: string;
    slug: { current: string };
    description: string;
    tagline: string;
    price: number;
    salePrice?: number;
    images: Array<{ url: string; alt?: string }>;
    category?: { name: string; slug: { current: string } };
    ingredients?: string[];
    inStock: boolean;
}

export default function ProductPage() {
    const [, params] = useRoute("/product/:slug");
    const slug = params?.slug;
    const { toast } = useToast();
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const { addItem } = useCart();

    // ... (useQuery code) ...

    const { data: product, isLoading, error } = useQuery<Product>({
        queryKey: ["product", slug],
        queryFn: async () => {
            const res = await apiRequest("GET", `/api/sanity/products/${slug}`);
            return res.json();
        },
        enabled: !!slug,
    });

    useEffect(() => {
        if (product) {
            document.title = `${product.name} | Pookley Naturals`;
        }
    }, [product]);

    const handleAddToCart = async () => {
        if (!product) return;
        await addItem(product, quantity);
    };

    const incrementQty = () => setQuantity(q => q + 1);
    const decrementQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
                <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
                <p className="text-neutral-500 mb-6">We couldn't find the product you're looking for.</p>
                <Button onClick={() => window.history.back()}>Go Back</Button>
            </div>
        );
    }

    const displayPrice = product.salePrice || product.price;
    const hasDiscount = !!product.salePrice;

    return (
        <div className="min-h-screen bg-background animate-fade-in">
            <Navigation />

            <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left Column: Image Gallery */}
                    <div className="space-y-6">
                        <div className="relative aspect-square bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100">
                            {product.images?.[activeImageIndex]?.url ? (
                                <motion.img
                                    key={activeImageIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    src={product.images[activeImageIndex].url}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-neutral-300">
                                    No Image
                                </div>
                            )}

                            {hasDiscount && (
                                <Badge className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-lg px-3 py-1">
                                    Sale
                                </Badge>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImageIndex(idx)}
                                        className={`relative w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${activeImageIndex === idx
                                            ? "border-neutral-900 ring-2 ring-neutral-900/20"
                                            : "border-transparent opacity-70 hover:opacity-100"
                                            }`}
                                    >
                                        <img src={img.url} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Value Props */}
                        <div className="grid grid-cols-3 gap-4 pt-6">
                            <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-neutral-50">
                                <Leaf className="w-6 h-6 text-green-600" />
                                <span className="text-xs font-medium">100% Organic</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-neutral-50">
                                <ShieldCheck className="w-6 h-6 text-blue-600" />
                                <span className="text-xs font-medium">Lab Tested</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-neutral-50">
                                <Heart className="w-6 h-6 text-rose-600" />
                                <span className="text-xs font-medium">Made with Love</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Product Info */}
                    <div className="flex flex-col">
                        {product.category && (
                            <p className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-3">
                                {product.category.name}
                            </p>
                        )}

                        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4 leading-tight">
                            {product.name}
                        </h1>

                        {product.tagline && (
                            <p className="text-xl text-neutral-600 font-light italic mb-6">
                                {product.tagline}
                            </p>
                        )}

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-3xl font-semibold text-foreground">
                                ${displayPrice.toFixed(2)}
                            </span>
                            {hasDiscount && (
                                <span className="text-xl text-neutral-400 line-through">
                                    ${product.price.toFixed(2)}
                                </span>
                            )}
                            <div className="flex items-center gap-1 ml-auto">
                                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                                <span className="font-medium">5.0</span>
                                <span className="text-neutral-400">(24 reviews)</span>
                            </div>
                        </div>

                        <Separator className="mb-8" />

                        {/* Description */}
                        <div className="prose prose-neutral mb-8">
                            <p className="text-lg leading-relaxed text-neutral-700">
                                {product.description}
                            </p>
                        </div>

                        {/* Add to Cart Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <div className="flex items-center border border-neutral-200 rounded-lg">
                                <button
                                    onClick={decrementQty}
                                    className="p-3 hover:bg-neutral-50 transition-colors"
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <div className="w-12 text-center font-medium">{quantity}</div>
                                <button
                                    onClick={incrementQty}
                                    className="p-3 hover:bg-neutral-50 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <Button
                                size="lg"
                                className="flex-1 text-lg h-12 bg-neutral-900 hover:bg-neutral-800"
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                            >
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                {product.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                        </div>

                        {!product.inStock && (
                            <p className="text-red-500 font-medium mb-6">
                                This item is currently out of stock. Check back soon!
                            </p>
                        )}

                        {/* Detailed Info Tabs */}
                        <Tabs defaultValue="details" className="mt-4">
                            <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto bg-transparent">
                                <TabsTrigger
                                    value="details"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-neutral-900 data-[state=active]:shadow-none px-6 py-3"
                                >
                                    Ingredients
                                </TabsTrigger>
                                <TabsTrigger
                                    value="ritual"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-neutral-900 data-[state=active]:shadow-none px-6 py-3"
                                >
                                    Ritual
                                </TabsTrigger>
                                <TabsTrigger
                                    value="shipping"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-neutral-900 data-[state=active]:shadow-none px-6 py-3"
                                >
                                    Shipping
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="details" className="pt-6 animate-fade-in">
                                <h4 className="font-serif text-xl mb-4">What's Inside</h4>
                                <ul className="space-y-3">
                                    {product.ingredients?.map((ingredient, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-1 bg-green-100 rounded-full p-1">
                                                <Check className="w-3 h-3 text-green-700" />
                                            </div>
                                            <span className="text-neutral-700">{ingredient}</span>
                                        </li>
                                    )) || (
                                            <p className="text-neutral-500 italic">Ingredients not listed.</p>
                                        )}
                                </ul>
                            </TabsContent>

                            <TabsContent value="ritual" className="pt-6 animate-fade-in">
                                <h4 className="font-serif text-xl mb-4">How to Use</h4>
                                <p className="text-neutral-700 mb-4">
                                    Take 1-2 capsules daily with water, preferably with a meal.
                                    Consistency is key to seeing results.
                                </p>
                                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                                    <p className="text-sm text-amber-900">
                                        <strong>Pro Tip:</strong> Create a mindful moment when taking your supplements.
                                        Close your eyes, take a deep breath, and set an intention for your day.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="shipping" className="pt-6 animate-fade-in">
                                <h4 className="font-serif text-xl mb-4">Shipping & Returns</h4>
                                <p className="text-neutral-700 mb-2">
                                    <strong>Free Shipping:</strong> On all domestic orders over $50.
                                </p>
                                <p className="text-neutral-700 mb-2">
                                    <strong>Fast Delivery:</strong> Orders typically ship within 24 hours.
                                </p>
                                <p className="text-neutral-700">
                                    <strong>Satisfaction Guarantee:</strong> If you're not happy, return it within 30 days for a full refund.
                                </p>
                            </TabsContent>
                        </Tabs>

                    </div>
                </div>
            </main>
        </div>
    );
}
