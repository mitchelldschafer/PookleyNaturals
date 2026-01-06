import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Star, Loader2 } from "lucide-react";
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
  category?: { _id: string; name: string; slug: { current: string } };
  inStock: boolean;
  featured: boolean;
}

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["sanity-products"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/sanity/products");
      return response.json();
    },
  });

  const categories = [
    { id: "all", name: "All Products" },
    { id: "blends", name: "Our Blends" },
    { id: "rituals", name: "Our Rituals" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
        (product: Product) =>
          product.category?.slug.current === selectedCategory
      );

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your shopping cart.`,
      duration: 3000,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Our Collection
          </h1>
          <p className="text-lg text-neutral-600">
            Carefully curated plant-based supplements designed for your wellness
            journey
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-40 bg-white border-b border-neutral-200 py-4 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="whitespace-nowrap"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-lg text-neutral-600">
                No products found in this category.
              </p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map((product: Product) => {
                const displayPrice = product.salePrice || product.price;
                const hasDiscount = !!product.salePrice;

                return (
                  <motion.div
                    key={product._id}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full overflow-hidden border-neutral-200 hover:shadow-xl transition-all duration-300">
                      {/* Image Container */}
                      <Link href={`/product/${product.slug.current}`}>
                        <div className="relative overflow-hidden bg-neutral-100 aspect-square cursor-pointer group-hover:opacity-90 transition-opacity">
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                              <span className="text-white text-lg font-semibold">
                                Out of Stock
                              </span>
                            </div>
                          )}

                          {product.images?.[0]?.url && (
                            <img
                              src={product.images[0].url}
                              alt={product.images[0].alt || product.name}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                          )}

                          {hasDiscount && (
                            <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600">
                              Sale
                            </Badge>
                          )}

                          {product.featured && !hasDiscount && (
                            <Badge className="absolute top-4 right-4 bg-amber-500 hover:bg-amber-600 flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </Link>

                      <CardContent className="pt-6 pb-3">
                        {product.category && (
                          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
                            {product.category.name}
                          </p>
                        )}

                        <Link href={`/product/${product.slug.current}`}>
                          <h3 className="font-serif text-xl text-foreground mb-2 leading-tight line-clamp-2 cursor-pointer hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>

                        {product.tagline && (
                          <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                            {product.tagline}
                          </p>
                        )}

                        <p className="text-sm text-neutral-700 line-clamp-3">
                          {product.description}
                        </p>
                      </CardContent>

                      <CardFooter className="flex flex-col gap-4">
                        {/* Price Section */}
                        <div className="w-full">
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-semibold text-foreground">
                              ${displayPrice.toFixed(2)}
                            </span>
                            {hasDiscount && (
                              <span className="text-sm text-neutral-500 line-through">
                                ${product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          {hasDiscount && (
                            <p className="text-xs text-red-600 mt-1">
                              Save ${(product.price - displayPrice).toFixed(2)}
                            </p>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                          className="w-full bg-neutral-900 hover:bg-neutral-800 text-white"
                          disabled={!product.inStock}
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Results Counter */}
      {!isLoading && filteredProducts.length > 0 && (
        <div className="py-8 px-6 text-center text-neutral-600 border-t border-neutral-200">
          <p>
            Showing{" "}
            <span className="font-semibold">{filteredProducts.length}</span>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>
      )}
    </div>
  );
}
