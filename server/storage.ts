import { type User, type InsertUser, type EmailSubscription, type InsertEmailSubscription, type Cart, type CartItem, type Order, type OrderItem, users, emailSubscriptions, carts, cartItems, orders, orderItems } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createEmailSubscription(subscription: InsertEmailSubscription): Promise<EmailSubscription>;
  getEmailSubscriptionByEmail(email: string): Promise<EmailSubscription | undefined>;

  createCart(userId?: string, sessionId?: string): Promise<any>;
  getCart(cartId: string): Promise<any>;
  updateCartStatus(cartId: string, status: string): Promise<any>;

  addToCart(cartId: string, productId: string, quantity: number): Promise<any>;
  updateCartItem(itemId: string, quantity: number): Promise<any>;
  removeCartItem(itemId: string): Promise<void>;
  clearCart(cartId: string): Promise<void>;

  createOrder(orderData: any): Promise<any>;
  createOrderItems(orderId: string, cartItems: any[]): Promise<any[]>;
  getOrder(orderId: string): Promise<any>;
  updateOrderStatus(orderId: string, status: string): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createEmailSubscription(insertSubscription: InsertEmailSubscription): Promise<EmailSubscription> {
    const [subscription] = await db.insert(emailSubscriptions).values(insertSubscription).returning();
    return subscription;
  }

  async getEmailSubscriptionByEmail(email: string): Promise<EmailSubscription | undefined> {
    const [subscription] = await db.select().from(emailSubscriptions).where(eq(emailSubscriptions.email, email));
    return subscription;
  }

  async createCart(userId?: string, sessionId?: string): Promise<any> {
    const [cart] = await db.insert(carts).values({
      userId: userId || null,
      sessionId: sessionId || null,
      status: 'active',
    }).returning();
    return cart;
  }

  async getCart(cartId: string): Promise<any> {
    const [cart] = await db.select().from(carts).where(eq(carts.id, cartId));
    if (!cart) return null;

    const items = await db.select().from(cartItems).where(eq(cartItems.cartId, cartId));

    return {
      ...cart,
      cart_items: items.map(item => ({
        id: item.id,
        cart_id: item.cartId,
        product_id: item.productId,
        quantity: item.quantity,
        created_at: item.createdAt,
      })),
    };
  }

  async updateCartStatus(cartId: string, status: string): Promise<any> {
    const [cart] = await db.update(carts)
      .set({ status, updatedAt: new Date() })
      .where(eq(carts.id, cartId))
      .returning();
    return cart;
  }

  async addToCart(cartId: string, productId: string, quantity: number): Promise<any> {
    const [existingItem] = await db.select().from(cartItems)
      .where(and(eq(cartItems.cartId, cartId), eq(cartItems.productId, productId)));

    if (existingItem) {
      const [updated] = await db.update(cartItems)
        .set({ quantity: existingItem.quantity + quantity })
        .where(eq(cartItems.id, existingItem.id))
        .returning();
      return updated;
    } else {
      const [item] = await db.insert(cartItems).values({
        cartId,
        productId,
        quantity,
      }).returning();
      return item;
    }
  }

  async updateCartItem(itemId: string, quantity: number): Promise<any> {
    if (quantity <= 0) {
      await this.removeCartItem(itemId);
      return null;
    }

    const [item] = await db.update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, itemId))
      .returning();
    return item;
  }

  async removeCartItem(itemId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, itemId));
  }

  async clearCart(cartId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.cartId, cartId));
  }

  async createOrder(orderData: any): Promise<any> {
    const [order] = await db.insert(orders).values({
      orderNumber: orderData.order_number,
      cartId: orderData.cart_id,
      userId: orderData.user_id,
      customerEmail: orderData.customer_email,
      customerName: orderData.customer_name,
      customerPhone: orderData.customer_phone,
      shippingAddress: JSON.stringify(orderData.shipping_address),
      billingAddress: orderData.billing_address ? JSON.stringify(orderData.billing_address) : null,
      subtotal: String(orderData.subtotal),
      tax: String(orderData.tax || 0),
      shippingCost: String(orderData.shipping_cost || 0),
      totalAmount: String(orderData.total_amount),
      status: orderData.status || 'pending',
      paymentStatus: orderData.payment_status || 'pending',
      stripePaymentIntentId: orderData.stripe_payment_intent_id,
    }).returning();
    return order;
  }

  async createOrderItems(orderId: string, items: any[]): Promise<any[]> {
    const insertItems = items.map(item => ({
      orderId,
      productId: item.product_id || item.productId,
      productName: item.product_name || 'Unknown Product',
      quantity: item.quantity,
      priceAtPurchase: String(item.price_at_purchase || 0),
      subtotal: String(item.subtotal || 0),
    }));

    const result = await db.insert(orderItems).values(insertItems).returning();
    return result;
  }

  async getOrder(orderId: string): Promise<any> {
    const [order] = await db.select().from(orders).where(eq(orders.id, orderId));
    if (!order) return null;

    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));

    return {
      ...order,
      order_items: items,
    };
  }

  async updateOrderStatus(orderId: string, status: string): Promise<any> {
    const [order] = await db.update(orders)
      .set({ status })
      .where(eq(orders.id, orderId))
      .returning();
    return order;
  }
}

export const storage = new DatabaseStorage();
