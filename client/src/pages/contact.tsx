import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Mail, MapPin, Clock } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

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

    document.title = "Contact Us | Pookley Naturals – Get in Touch";
    setMetaTag('description', "Have questions about our plant-based supplements? Reach out to the Pookley Naturals team. We're here to help you on your wellness journey.");
    setMetaTag('keywords', 'contact pookley naturals, customer support, wellness questions, supplement inquiries');
    setMetaTag('og:title', 'Contact Us – Pookley Naturals', 'og:title');
    setMetaTag('og:description', "Have questions? We're here to help you on your wellness journey.", 'og:description');
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
              Let's Connect
            </h1>
            <p 
              className="text-xl text-muted-foreground font-light"
              data-testid="text-hero-subtitle"
            >
              Questions, thoughts, or just want to say hello? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-background" data-testid="section-contact">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Form */}
            <motion.div {...fadeInUp}>
              <Card className="p-8" data-testid="card-contact-form">
                <h2 className="font-serif text-3xl text-foreground mb-6">Send a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your name" 
                              {...field} 
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="you@example.com" 
                              {...field} 
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="What's this about?" 
                              {...field} 
                              data-testid="input-subject"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us what's on your mind..." 
                              className="min-h-[150px] resize-none"
                              {...field} 
                              data-testid="input-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={contactMutation.isPending}
                      data-testid="button-submit"
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl text-foreground mb-4">Get in Touch</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you have a question about our blends, need guidance on your wellness ritual, 
                  or simply want to share your experience — we're here for you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4" data-testid="contact-email">
                  <div className="bg-primary/10 rounded-full p-3 shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Email Us</h3>
                    <p className="text-muted-foreground text-sm">hello@pookleynaturals.com</p>
                    <p className="text-muted-foreground text-sm mt-1">We respond within 24-48 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4" data-testid="contact-location">
                  <div className="bg-primary/10 rounded-full p-3 shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Our Home</h3>
                    <p className="text-muted-foreground text-sm">Los Angeles, California</p>
                    <p className="text-muted-foreground text-sm mt-1">Crafted with care on the West Coast</p>
                  </div>
                </div>

                <div className="flex items-start gap-4" data-testid="contact-hours">
                  <div className="bg-primary/10 rounded-full p-3 shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Support Hours</h3>
                    <p className="text-muted-foreground text-sm">Monday - Friday: 9am - 5pm PST</p>
                    <p className="text-muted-foreground text-sm mt-1">Weekends: We're resting too</p>
                  </div>
                </div>
              </div>

              <Card className="bg-accent/20 border-accent-border p-6 mt-8">
                <p className="text-foreground italic font-light text-center" data-testid="text-quote">
                  "Every message matters. Every question deserves care."
                </p>
              </Card>
            </motion.div>
          </div>
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
