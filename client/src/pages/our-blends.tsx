import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, Heart, Leaf, Sun } from "lucide-react";
import glowRitualImage from "@assets/generated_images/Glow_Ritual_supplement_jar_bdbaebc6.png";
import calmRestoreImage from "@assets/generated_images/Calm_Restore_supplement_jar_b929e0a0.png";
import vitalGreensImage from "@assets/generated_images/Vital_Greens_supplement_jar_e5812a2d.png";

const products = [
  {
    id: "glow-ritual",
    name: "Glow Ritual",
    tagline: "Your glow begins within",
    description:
      "Illuminate your inner glow with adaptogenic botanicals and natural antioxidants that support healthy skin and daily energy.",
    ingredients: "Rose hip + Maca root",
    image: glowRitualImage,
  },
  {
    id: "calm-restore",
    name: "Calm Restore",
    tagline: "Find your center",
    description:
      "Ease stress and balance your hormones with gentle herbs that support mood, rest, and inner harmony.",
    ingredients: "Ashwagandha + Chamomile",
    image: calmRestoreImage,
  },
  {
    id: "vital-greens",
    name: "Vital Greens",
    tagline: "Nourish your vitality",
    description:
      "Daily nourishment from organic greens, prebiotics, and minerals for energy, clarity, and vitality.",
    ingredients: "Spirulina + Wheatgrass",
    image: vitalGreensImage,
  },
];

const benefits = [
  {
    icon: Sun,
    title: "Energy",
    description: "Sustained vitality throughout your day",
  },
  {
    icon: Heart,
    title: "Hormone Balance",
    description: "Natural support for your cycle",
  },
  {
    icon: Leaf,
    title: "Calm Mind",
    description: "Gentle stress relief and clarity",
  },
  {
    icon: Sparkles,
    title: "Radiant Skin",
    description: "Beauty that starts from within",
  },
];

export default function OurBlends() {
  useEffect(() => {
    const originalTitle = document.title;
    
    const getMetaContent = (name: string, property?: string): string | null => {
      const element = property 
        ? document.querySelector(`meta[property="${property}"]`)
        : document.querySelector(`meta[name="${name}"]`);
      return element ? element.getAttribute('content') : null;
    };
    
    const originalDescription = getMetaContent('description');
    const originalKeywords = getMetaContent('keywords');
    const originalOgTitle = getMetaContent('og:title', 'og:title');
    const originalOgDescription = getMetaContent('og:description', 'og:description');
    const originalOgType = getMetaContent('og:type', 'og:type');
    
    const setMetaTag = (name: string, content: string, property?: string) => {
      let element = property 
        ? document.querySelector(`meta[property="${property}"]`)
        : document.querySelector(`meta[name="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const removeMetaTag = (name: string, property?: string) => {
      const element = property 
        ? document.querySelector(`meta[property="${property}"]`)
        : document.querySelector(`meta[name="${name}"]`);
      if (element) {
        element.remove();
      }
    };

    document.title = "Our Blends | Pookley – Plant-Based Supplements for Women's Wellness";
    setMetaTag('description', "Explore Pookley's signature blends for balance, calm, and vitality — thoughtfully crafted for women's wellness.");
    setMetaTag('keywords', 'women\'s supplements, natural blends, adaptogens, balance, calm, vitality');
    setMetaTag('og:title', 'Pookley – Discover Your Daily Ritual', 'og:title');
    setMetaTag('og:description', "Explore Pookley's signature blends for balance, calm, and vitality — thoughtfully crafted for women's wellness.", 'og:description');
    setMetaTag('og:type', 'website', 'og:type');
    
    return () => {
      document.title = originalTitle;
      
      if (originalDescription) {
        setMetaTag('description', originalDescription);
      } else {
        removeMetaTag('description');
      }
      
      if (originalKeywords) {
        setMetaTag('keywords', originalKeywords);
      } else {
        removeMetaTag('keywords');
      }
      
      if (originalOgTitle) {
        setMetaTag('og:title', originalOgTitle, 'og:title');
      } else {
        removeMetaTag('og:title', 'og:title');
      }
      
      if (originalOgDescription) {
        setMetaTag('og:description', originalOgDescription, 'og:description');
      } else {
        removeMetaTag('og:description', 'og:description');
      }
      
      if (originalOgType) {
        setMetaTag('og:type', originalOgType, 'og:type');
      } else {
        removeMetaTag('og:type', 'og:type');
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section
        className="relative pt-32 pb-20 px-6 overflow-hidden"
        data-testid="section-hero"
      >
        {/* Watercolor texture background */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(95, 122, 97, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(250, 236, 230, 0.2) 0%, transparent 50%)`,
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-6xl text-foreground mb-6"
            data-testid="text-hero-headline"
          >
            Discover Your Daily Ritual
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto"
            data-testid="text-hero-subline"
          >
            Each blend is crafted with care to nurture balance, beauty, and calm
            from within.
          </motion.p>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 px-6" data-testid="section-products">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card
                  className="hover-elevate active-elevate-2 overflow-visible border-border/50 h-full flex flex-col"
                  data-testid={`card-product-${product.id}`}
                >
                  <CardContent className="p-8 flex flex-col flex-1">
                    {/* Product Image */}
                    <div className="mb-6 relative">
                      <div className="aspect-square rounded-full overflow-hidden bg-secondary/20 p-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-full"
                          data-testid={`img-product-${product.id}`}
                        />
                      </div>
                    </div>

                    {/* Product Content */}
                    <div className="text-center flex-1 flex flex-col">
                      <h3
                        className="font-serif text-2xl text-foreground mb-2"
                        data-testid={`text-product-name-${product.id}`}
                      >
                        {product.name}
                      </h3>
                      <p
                        className="font-sans text-sm text-primary italic mb-4"
                        data-testid={`text-product-tagline-${product.id}`}
                      >
                        {product.tagline}
                      </p>
                      <p
                        className="font-sans text-muted-foreground mb-4 flex-1"
                        data-testid={`text-product-description-${product.id}`}
                      >
                        {product.description}
                      </p>
                      <div className="mb-6">
                        <p className="font-sans text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Key Ingredients
                        </p>
                        <p
                          className="font-sans text-sm text-foreground font-medium"
                          data-testid={`text-product-ingredients-${product.id}`}
                        >
                          {product.ingredients}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="font-sans w-full"
                        data-testid={`button-explore-${product.id}`}
                      >
                        Explore {product.name}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients & Benefits */}
      <section
        className="py-20 px-6 bg-secondary/20"
        data-testid="section-benefits"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="font-serif text-4xl text-foreground mb-4"
              data-testid="text-benefits-headline"
            >
              Crafted for Your Wellbeing
            </h2>
            <p
              className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto"
              data-testid="text-benefits-subtext"
            >
              Every ingredient is chosen with intention to support your natural
              balance and vitality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                  data-testid={`benefit-${benefit.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-sans text-lg font-medium text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="relative py-24 px-6 overflow-hidden"
        data-testid="section-cta"
      >
        {/* Gradient background: sage to blush */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(100, 20%, 50%) 0%, hsl(350, 40%, 75%) 100%)",
            opacity: 0.15,
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl text-foreground mb-4"
            data-testid="text-cta-headline"
          >
            Bring Balance Home
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-xl text-muted-foreground mb-8"
            data-testid="text-cta-subtext"
          >
            Experience the difference in every blend.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="font-sans"
              data-testid="button-shop-all"
            >
              Shop All
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-sans bg-background/80 backdrop-blur-sm"
              data-testid="button-join-ritual"
            >
              Join Our Ritual
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer - reusing from home page styles */}
      <footer className="py-12 px-6 border-t border-border" data-testid="footer">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3
                className="font-serif text-2xl text-foreground mb-2"
                data-testid="text-footer-brand"
              >
                Pookley
              </h3>
              <p
                className="font-sans text-sm text-muted-foreground"
                data-testid="text-footer-tagline"
              >
                Crafted with care in Colorado.
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Pinterest"
                data-testid="link-pinterest"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
