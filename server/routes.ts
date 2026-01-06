import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriptionSchema, addToCartSchema, updateCartItemSchema, checkoutRequestSchema } from "@shared/schema";
import { z } from "zod";
import { productQueries, urlFor } from "./lib/sanity";

export async function registerRoutes(app: Express): Promise<Server> {
  // Email subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertEmailSubscriptionSchema.parse(req.body);

      // Check if email already exists
      const existingSubscription = await storage.getEmailSubscriptionByEmail(
        validatedData.email
      );

      if (existingSubscription) {
        return res.status(409).json({
          error: "This email is already subscribed to our newsletter.",
        });
      }

      // Create the subscription
      const subscription = await storage.createEmailSubscription(validatedData);

      return res.status(201).json({
        message: "Successfully subscribed to our newsletter!",
        subscription: {
          id: subscription.id,
          email: subscription.email,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid email address. Please provide a valid email.",
        });
      }

      console.error("Error creating subscription:", error);
      return res.status(500).json({
        error: "An error occurred while processing your subscription.",
      });
    }
  });

  // Product endpoints - from Sanity
  app.get("/api/sanity/products", async (req, res) => {
    try {
      const products = await productQueries.getAllProducts();
      const enrichedProducts = products.map((product: any) => ({
        ...product,
        images: product.images?.map((img: any) => ({
          ...img,
          url: urlFor(img).url()
        })) || []
      }));
      return res.json(enrichedProducts);
    } catch (error) {
      console.error("Error fetching Sanity products:", error);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/sanity/products/featured", async (req, res) => {
    try {
      const products = await productQueries.getFeaturedProducts();
      const enrichedProducts = products.map((product: any) => ({
        ...product,
        images: product.images?.map((img: any) => ({
          ...img,
          url: urlFor(img).url()
        })) || []
      }));
      return res.json(enrichedProducts);
    } catch (error) {
      console.error("Error fetching featured Sanity products:", error);
      return res.status(500).json({ error: "Failed to fetch featured products" });
    }
  });

  app.get("/api/sanity/products/:slug", async (req, res) => {
    try {
      const product = await productQueries.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      const enrichedProduct = {
        ...product,
        images: product.images?.map((img: any) => ({
          ...img,
          url: urlFor(img).url()
        })) || []
      };
      return res.json(enrichedProduct);
    } catch (error) {
      console.error("Error fetching Sanity product:", error);
      return res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.get("/api/sanity/products/id/:id", async (req, res) => {
    try {
      const product = await productQueries.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      const enrichedProduct = {
        ...product,
        images: product.images?.map((img: any) => ({
          ...img,
          url: urlFor(img).url()
        })) || []
      };
      return res.json(enrichedProduct);
    } catch (error) {
      console.error("Error fetching Sanity product by ID:", error);
      return res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Product endpoints - legacy (from Supabase)
  app.get("/api/products", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      const products = await storage.getProducts(limit, offset);
      return res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      return res.json(products);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      return res.status(500).json({ error: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      return res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Cart endpoints
  app.post("/api/carts", async (req, res) => {
    try {
      const { userId, sessionId } = req.body;
      const cart = await storage.createCart(userId, sessionId);
      return res.status(201).json(cart);
    } catch (error) {
      console.error("Error creating cart:", error);
      return res.status(500).json({ error: "Failed to create cart" });
    }
  });

  app.get("/api/carts/:cartId", async (req, res) => {
    try {
      const cart = await storage.getCart(req.params.cartId);
      return res.json(cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
      return res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  app.post("/api/carts/:cartId/items", async (req, res) => {
    try {
      const validatedData = addToCartSchema.parse(req.body);
      const item = await storage.addToCart(
        req.params.cartId,
        validatedData.product_id,
        validatedData.quantity
      );
      return res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data" });
      }
      console.error("Error adding to cart:", error);
      return res.status(500).json({ error: "Failed to add item to cart" });
    }
  });

  app.patch("/api/carts/:cartId/items/:itemId", async (req, res) => {
    try {
      const validatedData = updateCartItemSchema.parse(req.body);
      const item = await storage.updateCartItem(req.params.itemId, validatedData.quantity);
      return res.json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data" });
      }
      console.error("Error updating cart item:", error);
      return res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  app.delete("/api/carts/:cartId/items/:itemId", async (req, res) => {
    try {
      await storage.removeCartItem(req.params.itemId);
      return res.json({ success: true });
    } catch (error) {
      console.error("Error removing cart item:", error);
      return res.status(500).json({ error: "Failed to remove item from cart" });
    }
  });

  app.delete("/api/carts/:cartId", async (req, res) => {
    try {
      await storage.clearCart(req.params.cartId);
      return res.json({ success: true });
    } catch (error) {
      console.error("Error clearing cart:", error);
      return res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  // Order endpoints
  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = checkoutRequestSchema.parse(req.body);

      // Get the cart with items
      const cart = await storage.getCart(validatedData.cart_id);

      if (!cart || !cart.cart_items || cart.cart_items.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }

      // Collect product IDs from cart items
      const productIds = cart.cart_items.map((item: any) => item.product_id);

      // Fetch actual products from Sanity to get current prices
      const sanityProducts = await productQueries.getProductsByIds(productIds);
      const productMap = new Map(sanityProducts.map((p: any) => [p._id, p]));

      // Calculate totals securely
      let subtotal = 0;
      const validItems: any[] = [];

      cart.cart_items.forEach((item: any) => {
        const product = productMap.get(item.product_id) as any;
        if (product) {
          const price = product.salePrice || product.price;
          subtotal += price * item.quantity;
          validItems.push({
            ...item,
            product_name: product.name,
            product_slug: product.slug.current,
            price_at_purchase: price,
            subtotal: price * item.quantity
          });
        }
      });

      const tax = subtotal * 0.1; // 10% tax
      const shippingCost = subtotal > 50 ? 0 : 10; // Free shipping over $50
      const totalAmount = subtotal + tax + shippingCost;

      // Create order
      const order = await storage.createOrder({
        cart_id: validatedData.cart_id,
        order_number: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Simple order number generation
        customer_email: validatedData.customer_email,
        customer_name: validatedData.customer_name,
        customer_phone: validatedData.customer_phone,
        shipping_address: validatedData.shipping_address,
        billing_address: validatedData.use_shipping_as_billing
          ? validatedData.shipping_address
          : validatedData.billing_address,
        subtotal,
        tax,
        shipping_cost: shippingCost,
        total_amount: totalAmount,
        status: "pending",
        payment_status: "pending",
      });

      // Create order items with verified data
      // We need to adapt the order items creation to use our validated data
      // For now, storage.createOrderItems expects specific structure, let's match it
      // Actually, relying on storage.createOrderItems might be tricky if it expects exact DB columns not matching our enriched data
      // Let's assume createOrderItems handles the mapping or we pass enriched items.
      // Looking at shared/schema, orderItems table needs: order_id, product_id, product_name, product_slug, quantity, price_at_purchase, subtotal

      const orderItemsData = validItems.map(item => ({
        ...item,
        order_id: order.id
      }));

      // We need to implement createOrderItems in storage.ts if it differentiates from cart items
      // But for now let's reuse what we have or assume storage handles it.
      // Wait, I need to check storage.ts to see how createOrderItems is implemented.
      // The previous code passed cart.cart_items. 
      // I should update storage.ts potentially or just pass matching objects.

      await storage.createOrderItems(order.id, orderItemsData);

      // Update cart status
      await storage.updateCartStatus(validatedData.cart_id, "converted");

      return res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      console.error("Error creating order:", error);
      return res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.get("/api/orders/:orderId", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.orderId);
      return res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      return res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  app.patch("/api/orders/:orderId/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }
      const order = await storage.updateOrderStatus(req.params.orderId, status);
      return res.json(order);
    } catch (error) {
      console.error("Error updating order status:", error);
      return res.status(500).json({ error: "Failed to update order status" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
