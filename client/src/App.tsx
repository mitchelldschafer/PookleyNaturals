import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/lib/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import Home from "@/pages/home";
import Shop from "@/pages/shop";
import ProductPage from "@/pages/product-page";
import OurBlends from "@/pages/our-blends";
import OurRituals from "@/pages/our-rituals";
import Ingredients from "@/pages/ingredients";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Checkout from "@/pages/checkout";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/product/:slug" component={ProductPage} />
      <Route path="/our-blends" component={OurBlends} />
      <Route path="/our-rituals" component={OurRituals} />
      <Route path="/ingredients" component={Ingredients} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <CartDrawer />
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/shop" component={Shop} />
            <Route path="/product/:slug" component={ProductPage} />
            <Route path="/our-blends" component={OurBlends} />
            <Route path="/our-rituals" component={OurRituals} />
            <Route path="/ingredients" component={Ingredients} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/checkout" component={Checkout} />
            <Route component={NotFound} />
          </Switch>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
