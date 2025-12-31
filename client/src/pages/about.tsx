import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Heart, Leaf, Target, Sparkles } from "lucide-react";
import founderImage from "@assets/Gemini_Generated_Image_eu1uj3eu1uj3eu1u_(1)_1767157378815.png";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function About() {
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

    document.title = "About Us | Pookley – Our Story & Mission";
    setMetaTag('description', "Meet the founder behind Pookley. A 20-year athlete's journey to plant-based wellness, longevity, and helping others thrive naturally.");
    setMetaTag('keywords', 'about pookley, founder story, wellness journey, athlete supplements, longevity, plant-based health');
    setMetaTag('og:title', 'About Us – Pookley', 'og:title');
    setMetaTag('og:description', "A 20-year athlete's journey to plant-based wellness and longevity.", 'og:description');
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

  const values = [
    {
      icon: Heart,
      title: "Passion for Wellness",
      description: "Every formula is crafted from a deep love for helping others feel their best, naturally."
    },
    {
      icon: Target,
      title: "Performance-Driven",
      description: "Two decades of athletic experience inform our approach to sustainable energy and recovery."
    },
    {
      icon: Leaf,
      title: "Plant-Powered",
      description: "We believe nature provides everything we need to thrive—no synthetics, no shortcuts."
    },
    {
      icon: Sparkles,
      title: "Longevity Focused",
      description: "Our mission is to support not just how you feel today, but how you'll thrive for years to come."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-card" data-testid="section-hero">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 
              className="font-serif text-5xl md:text-6xl text-foreground mb-6"
              data-testid="text-hero-title"
            >
              Our Story
            </h1>
            <p 
              className="text-xl text-muted-foreground font-light"
              data-testid="text-hero-subtitle"
            >
              A journey from the track to the apothecary — rooted in passion, driven by purpose.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-20 bg-background" data-testid="section-founder">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            
            {/* Photo */}
            <motion.div 
              {...fadeInUp}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={founderImage} 
                  alt="Founder of Pookley" 
                  className="w-full h-auto object-cover"
                  data-testid="img-founder"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary/10 rounded-full w-32 h-32 -z-10" />
              <div className="absolute -top-6 -left-6 bg-accent/30 rounded-full w-24 h-24 -z-10" />
            </motion.div>

            {/* Story */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="space-y-6">
              <h2 className="font-serif text-4xl text-foreground" data-testid="text-founder-title">
                Meet the Founder
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p data-testid="text-founder-story-1">
                  For over <strong className="text-foreground">20 years</strong>, I've lived the life of an athlete. 
                  From early morning training sessions to late-night recovery routines, my body has been my 
                  instrument — and I've learned to listen to what it truly needs.
                </p>
                
                <p data-testid="text-founder-story-2">
                  But somewhere along the way, I realized that peak performance isn't just about pushing harder. 
                  It's about <strong className="text-foreground">nourishing deeply</strong>. It's about giving your body 
                  the support it deserves — not with synthetic shortcuts, but with the wisdom of plants that have 
                  sustained us for generations.
                </p>
                
                <p data-testid="text-founder-story-3">
                  My passion for <strong className="text-foreground">longevity and health</strong> led me to study 
                  adaptogens, botanicals, and the science of aging well. I wanted to create something that would 
                  help women — athletes and everyday warriors alike — feel vibrant, balanced, and truly alive.
                </p>
                
                <p data-testid="text-founder-story-4">
                  That's why I created <strong className="text-foreground">Pookley</strong>. Every blend 
                  is a reflection of what I wish I had discovered sooner: clean, intentional formulas designed 
                  to support your body's natural rhythms and help you thrive — today, tomorrow, and for decades to come.
                </p>
              </div>

              <Card className="bg-accent/20 border-accent-border p-6 mt-8">
                <p className="text-foreground italic font-light text-lg" data-testid="text-founder-quote">
                  "I don't just want to live longer — I want to live <em>better</em>. And I believe you do too."
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card" data-testid="section-values">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-serif text-4xl text-foreground mb-4" data-testid="text-values-title">
              What We Stand For
            </h2>
            <p className="text-muted-foreground">
              Every decision we make is guided by these core values — from ingredient sourcing to the way we show up for you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="p-6 h-full text-center hover-elevate"
                  data-testid={`card-value-${index}`}
                >
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background" data-testid="section-mission">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl text-foreground mb-6" data-testid="text-mission-title">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8" data-testid="text-mission-body">
              To empower women to embrace their wellness journey with plant-based formulas that honor their 
              bodies, support their goals, and nurture their longevity. We believe that true health is a 
              daily practice — and we're here to make it simple, beautiful, and effective.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/our-blends">
                <Button size="lg" data-testid="button-explore-blends">
                  Explore Our Blends
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" data-testid="button-contact-us">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12" data-testid="footer">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-3">Pookley</h3>
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
                hello@pookley.com
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Pookley. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
