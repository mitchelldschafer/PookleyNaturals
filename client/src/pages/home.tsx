import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertEmailSubscriptionSchema } from "@shared/schema";
import { z } from "zod";
import { Instagram, Send, Check } from "lucide-react";
import { SiPinterest } from "react-icons/si";

import heroImage from "@assets/generated_images/Hero_lifestyle_wellness_image_5b25a51f.png";
import chamomileImage from "@assets/generated_images/Chamomile_botanical_illustration_b93f344a.png";
import matchaImage from "@assets/generated_images/Matcha_botanical_illustration_3f14f87d.png";
import roseImage from "@assets/generated_images/Rose_botanical_illustration_8d11154b.png";
import testimonial1 from "@assets/generated_images/Testimonial_portrait_one_fabf35ac.png";
import testimonial2 from "@assets/generated_images/Testimonial_portrait_two_47dc0177.png";
import testimonial3 from "@assets/generated_images/Testimonial_portrait_three_2d2ead27.png";

type EmailFormValues = z.infer<typeof insertEmailSubscriptionSchema>;

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(insertEmailSubscriptionSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const subscribeMutation = useMutation({
    mutationFn: async (data: EmailFormValues) => {
      const response = await apiRequest("POST", "/api/subscribe", data);
      return response;
    },
    onSuccess: () => {
      setIsSubscribed(true);
      form.reset();
      toast({
        title: "Welcome to our community",
        description: "You've been successfully subscribed to our newsletter.",
        duration: 5000,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  const onSubmit = (data: EmailFormValues) => {
    subscribeMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Image with parallax effect */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <img
            src={heroImage}
            alt="Woman enjoying herbal wellness tea in peaceful morning light"
            className="w-full h-full object-cover"
            data-testid="img-hero"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1
            className="font-serif text-5xl md:text-7xl text-white mb-6 animate-fade-in"
            style={{
              animationDelay: "0.2s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
            data-testid="text-hero-headline"
          >
            Find Balance in Every Sip.
          </h1>
          <p
            className="font-sans text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in"
            style={{
              animationDelay: "0.4s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
            data-testid="text-hero-subtext"
          >
            Plant-based supplements crafted for women's wellness and daily
            harmony.
          </p>
          <div
            className="animate-fade-in"
            style={{
              animationDelay: "0.6s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            <Button
              size="lg"
              variant="outline"
              className="bg-white/90 backdrop-blur-sm border-white/20 font-sans"
              data-testid="button-shop-now"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* About / Brand Story Section */}
      <section className="py-20 md:py-32 px-6 texture-watercolor">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-serif text-4xl md:text-5xl text-foreground mb-8"
            data-testid="text-about-headline"
          >
            Rooted in Nature
          </h2>
          <p
            className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed space-y-4"
            data-testid="text-about-body"
          >
            We believe in the wisdom of plants. Each blend is thoughtfully
            crafted to support women through every season of life. From hormone
            balance to sustained energy, our formulas honor your body's natural
            rhythms. Begin your ritual. Restore your harmony. Embrace wellness
            that feels like coming home.
          </p>
        </div>
      </section>

      {/* Product Highlights Section */}
      <section className="py-20 md:py-32 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-serif text-4xl md:text-5xl text-center text-card-foreground mb-16"
            data-testid="text-products-headline"
          >
            Our Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Glow Blend */}
            <Card
              className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300"
              data-testid="card-product-glow"
            >
              <CardContent className="p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-background/50 flex items-center justify-center">
                  <img
                    src={roseImage}
                    alt="Rose botanical illustration"
                    className="w-24 h-24 object-contain"
                    data-testid="img-product-glow"
                  />
                </div>
                <h3
                  className="font-serif text-2xl md:text-3xl text-card-foreground mb-4"
                  data-testid="text-product-glow-name"
                >
                  Glow Blend
                </h3>
                <p
                  className="font-sans text-muted-foreground leading-relaxed"
                  data-testid="text-product-glow-description"
                >
                  Radiance from within. Rose and hibiscus support skin vitality
                  and a luminous complexion.
                </p>
              </CardContent>
            </Card>

            {/* Calm Formula */}
            <Card
              className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300"
              data-testid="card-product-calm"
            >
              <CardContent className="p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-background/50 flex items-center justify-center">
                  <img
                    src={chamomileImage}
                    alt="Chamomile botanical illustration"
                    className="w-24 h-24 object-contain"
                    data-testid="img-product-calm"
                  />
                </div>
                <h3
                  className="font-serif text-2xl md:text-3xl text-card-foreground mb-4"
                  data-testid="text-product-calm-name"
                >
                  Calm Formula
                </h3>
                <p
                  className="font-sans text-muted-foreground leading-relaxed"
                  data-testid="text-product-calm-description"
                >
                  Gentle peace. Chamomile and passionflower ease tension and
                  invite tranquility into your day.
                </p>
              </CardContent>
            </Card>

            {/* Vital Greens */}
            <Card
              className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300"
              data-testid="card-product-vitals"
            >
              <CardContent className="p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-background/50 flex items-center justify-center">
                  <img
                    src={matchaImage}
                    alt="Matcha botanical illustration"
                    className="w-24 h-24 object-contain"
                    data-testid="img-product-vitals"
                  />
                </div>
                <h3
                  className="font-serif text-2xl md:text-3xl text-card-foreground mb-4"
                  data-testid="text-product-vitals-name"
                >
                  Vital Greens
                </h3>
                <p
                  className="font-sans text-muted-foreground leading-relaxed"
                  data-testid="text-product-vitals-description"
                >
                  Sustained energy. Matcha and spirulina nourish your body with
                  vibrant, plant-powered vitality.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-serif text-4xl md:text-5xl text-center text-foreground mb-16"
            data-testid="text-testimonials-headline"
          >
            What Our Community Says
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Testimonial 1 */}
            <div
              className="text-center space-y-4"
              data-testid="testimonial-1"
            >
              <Avatar className="w-20 h-20 mx-auto">
                <AvatarImage src={testimonial1} alt="Sarah M." />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <p
                className="font-sans text-muted-foreground italic leading-relaxed"
                data-testid="text-testimonial-1-quote"
              >
                "The Calm Formula has become my evening ritual. I feel more
                grounded and present."
              </p>
              <p
                className="font-sans text-sm text-foreground font-medium"
                data-testid="text-testimonial-1-name"
              >
                Sarah M.
              </p>
            </div>

            {/* Testimonial 2 */}
            <div
              className="text-center space-y-4"
              data-testid="testimonial-2"
            >
              <Avatar className="w-20 h-20 mx-auto">
                <AvatarImage src={testimonial2} alt="Maya L." />
                <AvatarFallback>ML</AvatarFallback>
              </Avatar>
              <p
                className="font-sans text-muted-foreground italic leading-relaxed"
                data-testid="text-testimonial-2-quote"
              >
                "Vital Greens gives me steady energy without the crash. It's
                changed my mornings completely."
              </p>
              <p
                className="font-sans text-sm text-foreground font-medium"
                data-testid="text-testimonial-2-name"
              >
                Maya L.
              </p>
            </div>

            {/* Testimonial 3 */}
            <div
              className="text-center space-y-4"
              data-testid="testimonial-3"
            >
              <Avatar className="w-20 h-20 mx-auto">
                <AvatarImage src={testimonial3} alt="Elena R." />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <p
                className="font-sans text-muted-foreground italic leading-relaxed"
                data-testid="text-testimonial-3-quote"
              >
                "My skin has never looked better. Glow Blend truly lives up to
                its name."
              </p>
              <p
                className="font-sans text-sm text-foreground font-medium"
                data-testid="text-testimonial-3-name"
              >
                Elena R.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Sign-up Section */}
      <section className="py-20 md:py-32 px-6 bg-card texture-watercolor">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="font-serif text-4xl md:text-5xl text-card-foreground mb-6"
            data-testid="text-signup-headline"
          >
            Join Our Ritual
          </h2>
          <p
            className="font-sans text-lg text-muted-foreground mb-8"
            data-testid="text-signup-subtext"
          >
            Receive wellness tips, seasonal blends, and exclusive offers.
          </p>
          {isSubscribed ? (
            <div
              className="flex items-center justify-center gap-2 text-primary animate-fade-in"
              data-testid="text-subscribe-success"
            >
              <Check className="w-5 h-5" />
              <p className="font-sans text-lg">
                Thank you for joining our ritual
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                data-testid="form-email-signup"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Your email address"
                          disabled={subscribeMutation.isPending}
                          className="font-sans"
                          data-testid="input-email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage data-testid="error-email" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="font-sans"
                  disabled={subscribeMutation.isPending}
                  data-testid="button-subscribe"
                >
                  {subscribeMutation.isPending ? (
                    <>
                      <span className="inline-block animate-spin mr-2">⟳</span>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Subscribe
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo/Brand */}
            <div className="text-center md:text-left">
              <h3
                className="font-serif text-2xl text-foreground mb-2"
                data-testid="text-footer-logo"
              >
                Lunara Naturals
              </h3>
              <p
                className="font-sans text-sm text-muted-foreground"
                data-testid="text-footer-tagline"
              >
                Crafted with care in Colorado.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow us on Instagram"
                data-testid="link-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow us on Pinterest"
                data-testid="link-pinterest"
              >
                <SiPinterest className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="font-sans text-xs text-muted-foreground">
              © {new Date().getFullYear()} Lunara Naturals. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
