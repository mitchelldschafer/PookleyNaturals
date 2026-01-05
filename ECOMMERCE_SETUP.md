# E-commerce Setup Guide for PookleyNaturals

This guide will walk you through setting up the complete e-commerce infrastructure for PookleyNaturals.

## Prerequisites

1. **Node.js and npm** - Already installed  
2. **Sanity.io account** - [Create free account](https://www.sanity.io/get-started)
3. **Supabase account** - [Create free account](https://supabase.com/dashboard)
4. **Stripe account** - [Create account](https://dashboard.stripe.com/register)

---

## Step 1: Install Dependencies

```bash
cd "/Users/mitchellschafer/Library/Mobile Documents/com~apple~CloudDocs/New Workspace/App Development/PookleyNaturals"
npm install
```

This will install all required packages including:
- `@sanity/client` and `@sanity/image-url` for Sanity CMS
- `@supabase/supabase-js` for Supabase database
- `stripe`, `@stripe/stripe-js`, and `@stripe/react-stripe-js` for payments
- Additional Sanity Studio dependencies

---

## Step 2: Set Up Sanity CMS

### 2.1 Create a Sanity Project

```bash
# Install Sanity CLI globally (if not already installed)
npm install -g @sanity/cli

# Login to Sanity
npx sanity login

# Initialize Sanity project
npx sanity init --project-id <your-project-id> --dataset production
```

Or create a project via the [Sanity Dashboard](https://www.sanity.io/manage).

### 2.2 Get Your Sanity Credentials

1. Go to [Sanity Management Console](https://www.sanity.io/manage)
2. Select your project
3. Note your **Project ID**
4. Go to **API** section
5. Create a new API token with **Editor** permissions
6. Save the token securely

### 2.3 Install Sanity Studio Dependencies

```bash
cd sanity
npm install sanity @sanity/vision @sanity/orderable-document-list
cd ..
```

---

## Step 3: Set Up Supabase

### 3.1 Create a Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in project details and create

### 3.2 Get Your Supabase Credentials

1. In your Supabase project, go to **Settings** > **API**
2. Note the following:
   - **Project URL**
   - **anon/public key** (safe for client-side)
   - **service_role key** (keep secret, server-side only)

### 3.3 Run Database Migration

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the contents of `supabase/migrations/001_ecommerce_tables.sql`
4. Paste into the SQL editor
5. Click "Run" to execute the migration

This will create all necessary tables for products, carts, orders, and set up Row Level Security.

---

## Step 4: Set Up Stripe

### 4.1 Get Stripe Test Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Enable **Test Mode** (toggle in top right)
3. Go to **Developers** > **API Keys**
4. Note the following:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

### 4.2 Set Up Webhook (Optional for now, required for production)

1. Go to **Developers** > **Webhooks**
2. Click "Add endpoint"
3. URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events: `checkout.session.completed`, `payment_intent.succeeded`
5. Note the **Signing secret** (starts with `whsec_`)

---

## Step 5: Configure Environment Variables

Create/update `.env` file in the project root (copy from `.env.example`):

```bash
# Existing Neon Database
DATABASE_URL=your_existing_neon_database_url

# Sanity CMS
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token
SANITY_API_VERSION=2024-01-01

# Public Sanity config (for Vite/client)
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=production

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key

# Public Supabase config (for client)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Stripe (Test Keys)
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Public Stripe config (for client)
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx

# Application
PORT=5000
NODE_ENV=development
VITE_API_URL=http://localhost:5000
```

---

## Step 6: Start Sanity Studio

```bash
cd sanity
npx sanity dev
```

The Sanity Studio will start at `http://localhost:3333`

### Add Your First Products

1. Open Sanity Studio at `http://localhost:3333`
2. Click "Products"
3. Create new products with:
   - Name (e.g., "Glow Ritual")
   - Slug (auto-generated from name)
   - Tagline
   - Description
   - Price
   - Upload images
   - Select category
   - List ingredients

---

## Step 7: Start the Development Server

In a new terminal:

```bash
npm run dev
```

The application will start at `http://localhost:5000`

---

## Step 8: Test the E-commerce Flow

1. **Browse Products**: Visit `/shop` to see products from Sanity
2. **Add to Cart**: Click "Add to Cart" on a product
3. **View Cart**: Check the cart drawer/icon
4. **Checkout**: Proceed to checkout and fill in test information
5. **Test Payment**: Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code

---

## Migrating Existing Products

The current hardcoded products in `client/src/pages/our-blends.tsx` should be migrated to Sanity:

**Existing Products:**
1. **Glow Ritual** - "Your glow begins within"
2. **Calm Restore** - "Find your center"
3. **Vital Greens** - "Nourish your vitality"

Add these to Sanity Studio with their descriptions, pricing, and images.

---

## Troubleshooting

### npm command not found
Make sure Node.js is properly installed and in your PATH.

### Sanity Studio doesn't start
Ensure you're in the `sanity/` directory and have run `npm install` there.

### Database migration fails
Check that you have the correct permissions in Supabase and that the SQL is copied correctly.

### Products don't appear
1. Verify Sanity credentials in `.env`
2. Check that products are published (not drafts) in Sanity Studio
3. Check browser console for API errors

---

## Next Steps

After setup is complete:
1. ✅ Test product browsing
2. ✅ Test cart functionality  
3. ✅ Test checkout with Stripe test cards
4. 🚀 Deploy Sanity Studio
5. 🚀 Deploy application to production
6. 🚀 Switch Stripe to live keys
7. 🚀 Configure production webhooks

---

## Architecture Summary

```
┌─────────────────┐
│   Sanity CMS    │ ← Product Content Management
│  (Content API)  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  React Frontend │
│   (Vite + TS)   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Express Server │
│   (Node.js)     │
└────────┬────────┘
         │
    ┌────┴────┐
    ↓         ↓
┌────────┐ ┌──────────┐
│ Neon   │ │ Supabase │ ← E-commerce Data
│  DB    │ │   (PG)   │    (cart, orders)
└────────┘ └──────────┘
              │
              ↓
         ┌─────────┐
         │ Stripe  │ ← Payment Processing
         └─────────┘
```

---

## Support

For issues or questions:
1. Check the implementation plan at `brain/*/implementation_plan.md`
2. Review task progress at `brain/*/task.md`
3. Consult API documentation:
   - [Sanity Docs](https://www.sanity.io/docs)
   - [Supabase Docs](https://supabase.com/docs)
   - [Stripe Docs](https://stripe.com/docs)
