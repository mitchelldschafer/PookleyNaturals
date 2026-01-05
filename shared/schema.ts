import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const emailSubscriptions = pgTable("email_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").notNull().defaultNow(),
});

export const insertEmailSubscriptionSchema = createInsertSchema(emailSubscriptions)
  .pick({
    email: true,
  })
  .extend({
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  });

export type InsertEmailSubscription = z.infer<typeof insertEmailSubscriptionSchema>;
export type EmailSubscription = typeof emailSubscriptions.$inferSelect;

// ================================================
// E-COMMERCE TYPES (for Supabase integration)
// ================================================

// Product from Sanity CMS
export const productSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  description: z.string().optional(),
  tagline: z.string().optional(),
  price: z.number().positive(),
  salePrice: z.number().positive().optional(),
  images: z.array(z.any()).optional(),
  category: z.object({
    _id: z.string(),
    name: z.string(),
    slug: z.object({
      current: z.string(),
    }),
  }).optional(),
  ingredients: z.array(z.string()).optional(),
  inStock: z.boolean().default(true),
  featured: z.boolean().default(false),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.array(z.string()).optional(),
  }).optional(),
});

export type Product = z.infer<typeof productSchema>;

// Cart
export const cartSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().optional(),
  session_id: z.string().optional(),
  status: z.enum(['active', 'converted', 'abandoned']),
  created_at: z.string().or(z.date()),
  updated_at: z.string().or(z.date()),
  expires_at: z.string().or(z.date()),
});

export type Cart = z.infer<typeof cartSchema>;

// Cart Item
export const cartItemSchema = z.object({
  id: z.string().uuid(),
  cart_id: z.string().uuid(),
  product_id: z.string().uuid(),
  quantity: z.number().int().positive(),
  created_at: z.string().or(z.date()),
  updated_at: z.string().or(z.date()),
  product: productSchema.optional(),
});

export type CartItem = z.infer<typeof cartItemSchema>;

// Address
export const addressSchema = z.object({
  line1: z.string().min(1, 'Address line 1 is required'),
  line2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postal_code: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
});

export type Address = z.infer<typeof addressSchema>;

// Order
export const orderSchema = z.object({
  id: z.string().uuid(),
  order_number: z.string(),
  cart_id: z.string().uuid().optional(),
  user_id: z.string().optional(),
  customer_email: z.string().email(),
  customer_name: z.string(),
  customer_phone: z.string().optional(),
  shipping_address: addressSchema,
  billing_address: addressSchema.optional(),
  subtotal: z.number(),
  tax: z.number().default(0),
  shipping_cost: z.number().default(0),
  total_amount: z.number(),
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']),
  payment_status: z.enum(['pending', 'paid', 'failed', 'refunded']),
  stripe_payment_intent_id: z.string().optional(),
  stripe_charge_id: z.string().optional(),
  notes: z.string().optional(),
  created_at: z.string().or(z.date()),
  updated_at: z.string().or(z.date()),
  shipped_at: z.string().or(z.date()).optional(),
  delivered_at: z.string().or(z.date()).optional(),
});

export type Order = z.infer<typeof orderSchema>;

// Order Item
export const orderItemSchema = z.object({
  id: z.string().uuid(),
  order_id: z.string().uuid(),
  product_id: z.string().uuid(),
  product_name: z.string(),
  product_slug: z.string(),
  quantity: z.number().int().positive(),
  price_at_purchase: z.number(),
  subtotal: z.number(),
  created_at: z.string().or(z.date()),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

// Checkout Request
export const checkoutRequestSchema = z.object({
  cart_id: z.string().uuid(),
  customer_email: z.string().email('Please enter a valid email address'),
  customer_name: z.string().min(1, 'Name is required'),
  customer_phone: z.string().optional(),
  shipping_address: addressSchema,
  billing_address: addressSchema.optional(),
  use_shipping_as_billing: z.boolean().default(true),
});

export type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;

// Add to Cart Request
export const addToCartSchema = z.object({
  product_id: z.string(),
  quantity: z.number().int().positive().default(1),
  cart_id: z.string().uuid().optional(),
});

export type AddToCartRequest = z.infer<typeof addToCartSchema>;

// Update Cart Item Request
export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(0), // 0 to remove
});

export type UpdateCartItemRequest = z.infer<typeof updateCartItemSchema>;
