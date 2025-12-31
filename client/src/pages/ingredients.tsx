import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Flower2, Sprout, Cherry, Droplet, Waves, Wind, Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/botanical_herbs_on_linen_flatlay_42a1fa18.png";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const ingredients = [
  {
    name: "Ashwagandha",
    category: "Adaptogen · Calm & Stress Support",
    tag: "Calm & Mood",
    icon: Leaf,
    description: "An ancient adaptogenic root that helps your body manage stress with grace. Traditionally used to support calm, resilience, and restful sleep — a gentle companion for modern life."
  },
  {
    name: "Chamomile",
    category: "Soothing Flower · Rest & Relaxation",
    tag: "Calm & Mood",
    icon: Flower2,
    description: "Delicate chamomile flowers have been cherished for centuries as a natural way to ease into rest. Known for its calming properties, it helps quiet a busy mind and supports peaceful evenings."
  },
  {
    name: "Maca Root",
    category: "Energizing Root · Hormone Balance",
    tag: "Hormone Balance",
    icon: Sprout,
    description: "A nourishing root from the Peruvian highlands, maca is known to support energy, stamina, and hormonal harmony. It's a natural ally for women seeking balance through every phase of life."
  },
  {
    name: "Rose Hip",
    category: "Vitamin C Rich · Skin & Glow",
    tag: "Skin & Glow",
    icon: Cherry,
    description: "These bright red fruits of the wild rose are packed with natural vitamin C and antioxidants. Rose hip supports radiant skin from within and helps your body's natural defenses shine."
  },
  {
    name: "Spirulina",
    category: "Nutrient-Dense Algae · Energy & Vitality",
    tag: "Energy & Vitality",
    icon: Droplet,
    description: "A blue-green algae powerhouse rich in protein, vitamins, and minerals. Spirulina supports daily energy, vitality, and nourishment — nature's multivitamin in its most vibrant form."
  },
  {
    name: "Wheatgrass",
    category: "Detoxifying Greens · Daily Nourishment",
    tag: "Energy & Vitality",
    icon: Waves,
    description: "Young wheat shoots harvested at their nutritional peak. Wheatgrass is a gentle detoxifier that supports alkalinity, digestion, and daily vitality. Small leaves. Big nourishment."
  },
  {
    name: "Lemon Balm",
    category: "Calming Herb · Easeful Mind",
    tag: "Calm & Mood",
    icon: Wind,
    description: "A mint-family herb with a light, lemony scent known for its mood-lifting and calming qualities. Lemon balm helps ease mental tension and supports a sense of gentle, centered calm."
  },
  {
    name: "Holy Basil (Tulsi)",
    category: "Adaptogen · Clarity & Calm",
    tag: "Calm & Mood",
    icon: Sparkles,
    description: "Revered in Ayurvedic tradition as 'The Queen of Herbs,' holy basil supports mental clarity, stress resilience, and emotional balance. It's grounding, uplifting, and deeply restorative."
  }
];

const categories = [
  { name: "Calm & Mood", color: "bg-primary/10 text-primary" },
  { name: "Energy & Vitality", color: "bg-accent/20 text-accent-foreground" },
  { name: "Hormone Balance", color: "bg-muted text-muted-foreground" },
  { name: "Skin & Glow", color: "bg-accent/30 text-accent-foreground" }
];

export default function Ingredients() {
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

    document.title = "Ingredients Library | Pookley Naturals – Botanicals for Women's Wellness";
    setMetaTag('description', "Explore the herbs and botanicals inside Pookley Naturals' blends — thoughtfully chosen to support calm, energy, and balance.");
    setMetaTag('keywords', 'botanical ingredients, adaptogens, herbs, ashwagandha, spirulina, natural supplements, plant-based wellness');
    setMetaTag('og:title', 'Ingredients Library – Pookley Naturals', 'og:title');
    setMetaTag('og:description', "Explore the herbs and botanicals inside Pookley Naturals' blends — thoughtfully chosen to support calm, energy, and balance.", 'og:description');
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
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden" data-testid="section-hero">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            filter: 'brightness(0.8)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <motion.h1 
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-card-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            data-testid="text-hero-title"
          >
            The Heart of Our Blends
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-card-foreground/90 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            data-testid="text-hero-subtitle"
          >
            Every Pookley Naturals formula begins with thoughtfully chosen botanicals, rooted in tradition and guided by modern wellness.
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-card" data-testid="section-intro">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed mb-4" data-testid="text-intro-description">
              We believe ingredients matter — not just what's on the label, but where they come from, how they're grown, and 
              the intention behind every choice. Each botanical in our blends is selected for its purity, its history, and its 
              gentle power to support women's wellness.
            </p>
            <p className="text-xl text-foreground italic font-light" data-testid="text-intro-quote">
              "When you know what's inside, you can trust what you feel."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Tags */}
      <section className="py-8 bg-background" data-testid="section-categories">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp}>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {categories.map((category) => (
                <Badge 
                  key={category.name}
                  variant="secondary"
                  className={`px-4 py-2 ${category.color} border-0`}
                  data-testid={`badge-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ingredients Grid */}
      <section className="py-20 bg-background" data-testid="section-ingredients">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {ingredients.map((ingredient, index) => {
              const Icon = ingredient.icon;
              const categoryStyle = categories.find(c => c.name === ingredient.tag);
              
              return (
                <motion.article
                  key={ingredient.name}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  data-testid={`card-ingredient-${ingredient.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Card className="p-6 h-full hover-elevate">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-primary/10 rounded-full p-3">
                        <Icon className="w-8 h-8 text-primary" data-testid={`icon-${ingredient.name.toLowerCase().replace(/\s+/g, '-')}`} />
                      </div>
                      {categoryStyle && (
                        <Badge 
                          variant="secondary"
                          className={`text-xs ${categoryStyle.color} border-0`}
                          data-testid={`tag-${ingredient.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {ingredient.tag}
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="font-serif text-2xl text-foreground mb-2" data-testid={`name-${ingredient.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {ingredient.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3 font-medium" data-testid={`category-${ingredient.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {ingredient.category}
                    </p>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`description-${ingredient.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {ingredient.description}
                    </p>
                  </Card>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Safety & Transparency Section */}
      <section className="py-20 bg-card" data-testid="section-safety">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl text-foreground text-center mb-8" data-testid="text-safety-title">
              Gentle, Honest, Transparent
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4" data-testid="safety-point-1">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">No Harsh Fillers</h3>
                  <p className="text-muted-foreground text-sm">
                    We keep our formulas clean and purposeful. Every ingredient earns its place — no unnecessary additives, 
                    no synthetic fillers, just what your body needs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4" data-testid="safety-point-2">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Crafted with Intention</h3>
                  <p className="text-muted-foreground text-sm">
                    Each blend is thoughtfully formulated and sourced from trusted suppliers. We prioritize quality, 
                    purity, and the integrity of every botanical we use.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4" data-testid="safety-point-3">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Your Wellness, Your Choices</h3>
                  <p className="text-muted-foreground text-sm">
                    Our supplements are designed to support your wellness journey, but they're not a substitute for 
                    professional medical advice. Always consult with your healthcare provider before starting any new supplement.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section 
        className="py-20 bg-gradient-to-r from-primary/20 via-accent/30 to-accent/20" 
        data-testid="section-cta"
      >
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4" data-testid="text-cta-title">
              Ready to meet the blends these ingredients call home?
            </h2>
            <p className="text-muted-foreground mb-8 italic">
              Grown in the earth. Chosen for you.
            </p>
            <Link href="/our-blends">
              <Button size="lg" className="min-w-[200px]" data-testid="button-explore-blends">
                Explore Our Blends
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12" data-testid="footer">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-3">Pookley Naturals</h3>
              <p className="text-sm text-muted-foreground">
                Plant-based wellness for the modern woman.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-home">
                  Home
                </Link>
                <Link href="/our-blends" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-blends">
                  Our Blends
                </Link>
                <Link href="/our-rituals" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-rituals">
                  Our Rituals
                </Link>
                <Link href="/ingredients" className="block text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-ingredients">
                  Ingredients
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Connect</h4>
              <p className="text-sm text-muted-foreground">
                mitchell.schafer@pookley.com
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Pookley Naturals. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
