import { type User, type InsertUser, type EmailSubscription, type InsertEmailSubscription, type Cart, type CartItem, type Order, type OrderItem, type Product } from "@shared/schema";
import { randomUUID } from "crypto";
import { supabase } from "./lib/supabase";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createEmailSubscription(subscription: InsertEmailSubscription): Promise<EmailSubscription>;
  getEmailSubscriptionByEmail(email: string): Promise<EmailSubscription | undefined>;

  // E-commerce operations
  getProduct(id: string): Promise<Product | undefined>;
  getProducts(limit?: number, offset?: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;

  createCart(userId?: string, sessionId?: string): Promise<Cart>;
  getCart(cartId: string): Promise<any>;
  updateCartStatus(cartId: string, status: string): Promise<Cart>;

  addToCart(cartId: string, productId: string, quantity: number): Promise<CartItem>;
  updateCartItem(itemId: string, quantity: number): Promise<CartItem | null>;
  removeCartItem(itemId: string): Promise<void>;
  clearCart(cartId: string): Promise<void>;

  createOrder(orderData: any): Promise<Order>;
  createOrderItems(orderId: string, cartItems: any[]): Promise<OrderItem[]>;
  getOrder(orderId: string): Promise<any>;
  updateOrderStatus(orderId: string, status: string): Promise<Order>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private emailSubscriptions: Map<string, EmailSubscription>;

  constructor() {
    this.users = new Map();
    this.emailSubscriptions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createEmailSubscription(insertSubscription: InsertEmailSubscription): Promise<EmailSubscription> {
    const id = randomUUID();
    const subscription: EmailSubscription = {
      ...insertSubscription,
      id,
      subscribedAt: new Date(),
    };
    this.emailSubscriptions.set(subscription.email, subscription);
    return subscription;
  }

  async getEmailSubscriptionByEmail(email: string): Promise<EmailSubscription | undefined> {
    return this.emailSubscriptions.get(email);
  }

  // E-commerce operations - Products
  async getProduct(id: string): Promise<Product | undefined> {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    return data || undefined;
  }

  async getProducts(limit = 10, offset = 0): Promise<Product[]> {
    const { data } = await supabase
      .from('products')
      .select('*')
      .range(offset, offset + limit - 1);
    return data || [];
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true);
    return data || [];
  }

  // E-commerce operations - Carts
  async createCart(userId?: string, sessionId?: string): Promise<Cart> {
    const { data, error } = await supabase
      .from('carts')
      .insert({
        user_id: userId,
        session_id: sessionId,
        status: 'active',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getCart(cartId: string): Promise<any> {
    const { data, error } = await supabase
      .from('carts')
      .select(
        `
        *,
        cart_items (
          *
        )
      `
      )
      .eq('id', cartId)
      .single();

    if (error) throw error;
    return data;
  }

  async updateCartStatus(cartId: string, status: string): Promise<Cart> {
    const { data, error } = await supabase
      .from('carts')
      .update({ status })
      .eq('id', cartId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async addToCart(cartId: string, productId: string, quantity: number): Promise<CartItem> {
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('cart_id', cartId)
      .eq('product_id', productId)
      .maybeSingle();

    if (existingItem) {
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          cart_id: cartId,
          product_id: productId,
          quantity,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }

  async updateCartItem(itemId: string, quantity: number): Promise<CartItem | null> {
    if (quantity <= 0) {
      await this.removeCartItem(itemId);
      return null;
    }

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async removeCartItem(itemId: string): Promise<void> {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) throw error;
  }

  async clearCart(cartId: string): Promise<void> {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId);

    if (error) throw error;
  }

  // E-commerce operations - Orders
  async createOrder(orderData: any): Promise<Order> {
    const orderNumber = `ORD-${Date.now()}`;
    const { data, error } = await supabase
      .from('orders')
      .insert({
        ...orderData,
        order_number: orderNumber,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async createOrderItems(orderId: string, cartItems: any[]): Promise<OrderItem[]> {
    const orderItems = cartItems.map((item) => ({
      order_id: orderId,
      product_id: item.product_id || item.productId,
      product_name: item.product_name || 'Unknown Product',
      product_slug: item.product_slug || 'unknown',
      quantity: item.quantity,
      price_at_purchase: item.price_at_purchase || 0,
      subtotal: item.subtotal || 0,
    }));

    const { data, error } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select();

    if (error) throw error;
    return data || [];
  }

  async getOrder(orderId: string): Promise<any> {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        order_items (
          *,
          products (*)
        )
      `
      )
      .eq('id', orderId)
      .single();

    if (error) throw error;
    return data;
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export const storage = new MemStorage();
