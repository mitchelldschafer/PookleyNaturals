import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sunrise, Heart, Moon, Sparkles, Coffee, BookOpen, Flame, Calendar, Flower2, Sun } from "lucide-react";
import heroImage from "@assets/generated_images/calm_morning_ritual_tea_scene_b51a4f59.png";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function OurRituals() {
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

    document.title = "Our Rituals | Pookley Naturals – Daily Wellness Practices for Women";
    setMetaTag('description', "Discover gentle daily rituals to weave Pookley Naturals supplements into your morning, midday, and evening routine. Small, loving choices that add up to a life in balance.");
    setMetaTag('keywords', 'daily rituals, wellness routine, self-care habits, morning ritual, evening routine, mindful living');
    setMetaTag('og:title', 'Our Rituals – Pookley Naturals', 'og:title');
    setMetaTag('og:description', "Small, loving choices add up to a life in balance. Discover your daily wellness ritual.", 'og:description');
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
            filter: 'brightness(0.85)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <motion.h1 
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-card-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            data-testid="text-hero-title"
          >
            Welcome to Your Ritual
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-card-foreground/90 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            data-testid="text-hero-subtitle"
          >
            Small, loving choices add up to a life in balance.
          </motion.p>
        </div>
      </section>

      {/* Morning Ritual Section */}
      <section className="py-20 bg-card" data-testid="section-morning">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp}>
            <div className="flex items-center gap-3 mb-8 justify-center">
              <Sunrise className="w-8 h-8 text-primary" data-testid="icon-sunrise" />
              <h2 className="font-serif text-4xl md:text-5xl text-foreground" data-testid="text-morning-title">
                Morning Ritual · Rise & Glow
              </h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6" data-testid="text-morning-description">
                Stir one scoop of <span className="text-primary font-medium">Glow Ritual</span> into warm water or your favorite latte. 
                Take three deep breaths. Set an intention for your day. This is your moment — gentle, grounding, and entirely yours.
              </p>
              <Card className="bg-accent/20 border-accent-border p-6">
                <p className="text-foreground italic font-light" data-testid="text-morning-affirmation">
                  "Today, I choose energy that feels gentle, not rushed."
                </p>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="space-y-6">
              <div className="flex items-start gap-4" data-testid="step-morning-1">
                <div className="bg-primary/10 rounded-full p-3 shrink-0">
                  <Coffee className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">1. Prepare</h3>
                  <p className="text-muted-foreground text-sm">Mix your blend into warm water or milk</p>
                </div>
              </div>

              <div className="flex items-start gap-4" data-testid="step-morning-2">
                <div className="bg-primary/10 rounded-full p-3 shrink-0">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">2. Breathe</h3>
                  <p className="text-muted-foreground text-sm">Take three slow, intentional breaths</p>
                </div>
              </div>

              <div className="flex items-start gap-4" data-testid="step-morning-3">
                <div className="bg-primary/10 rounded-full p-3 shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">3. Intend</h3>
                  <p className="text-muted-foreground text-sm">Set one gentle intention for your day</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Midday Reset Section */}
      <section className="py-20 bg-background" data-testid="section-midday">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp}>
            <div className="flex items-center gap-3 mb-8 justify-center">
              <Sun className="w-8 h-8 text-primary" data-testid="icon-sun" />
              <h2 className="font-serif text-4xl md:text-5xl text-foreground" data-testid="text-midday-title">
                Midday Ritual · Breathe & Restore
              </h2>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="max-w-3xl mx-auto">
            <Card className="p-8 md:p-10">
              <p className="text-xl text-muted-foreground mb-6 italic" data-testid="text-midday-quote">
                "For the moments when your mind feels loud."
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-8" data-testid="text-midday-description">
                When the day gets heavy, pause. Sip <span className="text-primary font-medium">Calm Restore</span>, 
                walk away from your screens, and let your shoulders drop. This is your permission to reset.
              </p>

              <div className="space-y-4">
                <h3 className="font-medium text-foreground mb-4">Your 5-Minute Reset:</h3>
                <div className="flex items-center gap-3" data-testid="checklist-midday-1">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <p className="text-muted-foreground">Hydrate with your Calm Restore blend</p>
                </div>
                <div className="flex items-center gap-3" data-testid="checklist-midday-2">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <p className="text-muted-foreground">Step outside or gaze out a window</p>
                </div>
                <div className="flex items-center gap-3" data-testid="checklist-midday-3">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <p className="text-muted-foreground">Unplug from devices for 5 full minutes</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Evening Wind-Down Section */}
      <section className="py-20 bg-card" data-testid="section-evening">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp}>
            <div className="flex items-center gap-3 mb-8 justify-center">
              <Moon className="w-8 h-8 text-primary" data-testid="icon-moon" />
              <h2 className="font-serif text-4xl md:text-5xl text-foreground" data-testid="text-evening-title">
                Evening Ritual · Rest & Renew
              </h2>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center" data-testid="step-evening-1">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Moon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Slow Down</h3>
                <p className="text-sm text-muted-foreground">
                  Dim the lights. Close your laptop. Let the day's energy soften.
                </p>
              </div>

              <div className="text-center" data-testid="step-evening-2">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Flower2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Nourish</h3>
                <p className="text-sm text-muted-foreground">
                  Mix your <span className="text-primary">Vital Greens</span> into cool water. A gentle close to the day.
                </p>
              </div>

              <div className="text-center" data-testid="step-evening-3">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Unplug</h3>
                <p className="text-sm text-muted-foreground">
                  Set your phone aside. Your body knows how to rest when you let it.
                </p>
              </div>
            </div>

            <Card className="bg-accent/20 border-accent-border p-8 text-center">
              <p className="text-lg text-foreground italic font-light" data-testid="text-evening-quote">
                "You are allowed to rest. Your body is allowed to exhale."
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Ritual Tips Section */}
      <section className="py-20 bg-background" data-testid="section-tips">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp}>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground text-center mb-4" data-testid="text-tips-title">
              Ritual Tips & Micro-Habits
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Your ritual doesn't have to be perfect. It just has to be yours.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
              <Card className="p-6 h-full hover-elevate" data-testid="card-tip-1">
                <Flame className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-medium text-foreground mb-2">Light a candle</h3>
                <p className="text-sm text-muted-foreground">
                  Create a moment of calm before you take your supplement.
                </p>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <Card className="p-6 h-full hover-elevate" data-testid="card-tip-2">
                <BookOpen className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-medium text-foreground mb-2">Pair with journaling</h3>
                <p className="text-sm text-muted-foreground">
                  Write one line about how you feel. Track your energy gently.
                </p>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
              <Card className="p-6 h-full hover-elevate" data-testid="card-tip-3">
                <Coffee className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-medium text-foreground mb-2">Anchor to your routine</h3>
                <p className="text-sm text-muted-foreground">
                  Attach your ritual to something you already do — coffee, skincare, tea.
                </p>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
              <Card className="p-6 h-full hover-elevate" data-testid="card-tip-4">
                <Sparkles className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-medium text-foreground mb-2">Keep it visible</h3>
                <p className="text-sm text-muted-foreground">
                  Leave your bottle where you'll see it. On the counter, by the kettle.
                </p>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.5 }}>
              <Card className="p-6 h-full hover-elevate" data-testid="card-tip-5">
                <Calendar className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-medium text-foreground mb-2">Same time, same place</h3>
                <p className="text-sm text-muted-foreground">
                  Consistency creates calm. Choose a time that feels natural for you.
                </p>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.6 }}>
              <Card className="p-6 h-full hover-elevate" data-testid="card-tip-6">
                <Heart className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-medium text-foreground mb-2">One sip, one breath</h3>
                <p className="text-sm text-muted-foreground">
                  It's not just about the supplement. It's about the pause you give yourself.
                </p>
              </Card>
            </motion.div>
          </div>
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
              Begin Your Ritual
            </h2>
            <p className="text-xl text-muted-foreground mb-8" data-testid="text-cta-subtitle">
              Choose the blend that meets you where you are.
            </p>
            <p className="text-muted-foreground mb-10 italic">
              One sip. One breath. One small act of care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/our-blends">
                <Button size="lg" className="min-w-[200px]" data-testid="button-explore-blends">
                  Explore Our Blends
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="min-w-[200px]" data-testid="button-join-ritual">
                  Join Our Ritual
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
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Connect</h4>
              <p className="text-sm text-muted-foreground">
                hello@pookleynaturals.com
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
