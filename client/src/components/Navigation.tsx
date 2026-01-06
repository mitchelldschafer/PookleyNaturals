import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";

export function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleDrawer, itemCount } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/our-blends", label: "Our Blends" },
    { href: "/our-rituals", label: "Our Rituals" },
    { href: "/ingredients", label: "Ingredients" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm border-b border-border"
      data-testid="nav-main"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl text-foreground hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors"
            data-testid="link-home-logo"
          >
            Pookley Naturals
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-sm transition-colors hover-elevate active-elevate-2 px-3 py-2 rounded-md ${location === link.href
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
                  }`}
                data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/shop">
              <Button
                size="default"
                className="font-sans"
                data-testid="button-shop-now"
              >
                Shop Now
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => toggleDrawer()}
              data-testid="button-cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Cart & Menu */}
          <div className="flex items-center gap-4 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => toggleDrawer()}
              data-testid="button-cart-mobile"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>

            <button
              className="p-2 hover-elevate active-elevate-2 rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in"
            data-testid="menu-mobile"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-sans text-sm block px-4 py-2 rounded-md hover-elevate active-elevate-2 transition-colors ${location === link.href
                    ? "text-primary font-medium bg-primary/5"
                    : "text-muted-foreground"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  size="default"
                  className="font-sans w-full"
                  data-testid="button-mobile-shop-now"
                >
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
