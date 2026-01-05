# Quick Setup Guide for Pookley Naturals E-commerce

## 🚀 Fast Track Setup (15 minutes)

### Step 1: Create Sanity Project (5 min)

1. Go to https://www.sanity.io/manage
2. Click "Create new project"
3. Name it: **Pookley Naturals**
4. Dataset: **production**
5. Go to **Settings** → **API**
6. Create new token with **Editor** permissions
7. Copy the **Project ID** and **Token**

### Step 2: Create Supabase Project (5 min)

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Name it: **pookley-naturals**
4. Choose a region close to you
5. Set a strong database password (save it!)
6. Wait for project to finish creating (~2 min)
7. Go to **Settings** → **API**
8. Copy:
   - Project URL
   - `anon` `public` key
   - `service_role` key (keep secret!)

### Step 3: Run Database Migration (2 min)

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Open `supabase/migrations/001_ecommerce_tables.sql`
4. Copy all the SQL code
5. Paste into Supabase SQL editor
6. Click **Run** (bottom right)
7. Should see success message!

### Step 4: Get Stripe Test Keys (3 min)

1. Go to https://dashboard.stripe.com/register
2. Create account (or login)
3. **IMPORTANT:** Toggle to **TEST MODE** (top right corner)
4. Go to **Developers** → **API keys**
5. Copy:
   - Publishable key (starts with `pk_test_`)
   - Secret key (starts with `sk_test_` - click "Reveal")

### Step 5: Update .env File

Open `.env` file and fill in your credentials:

```bash
# Sanity (from Step 1)
SANITY_PROJECT_ID=abc123xyz
SANITY_API_TOKEN=sk...
VITE_SANITY_PROJECT_ID=abc123xyz

# Supabase (from Step 2)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# Stripe (from Step 4)
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

### Step 6: Install Sanity Studio Dependencies

```bash
cd sanity
npm install sanity @sanity/vision @sanity/orderable-document-list
cd ..
```

### Step 7: Start Sanity Studio

```bash
cd sanity
npx sanity dev
```

Studio will open at http://localhost:3333

### Step 8: Add Products in Sanity Studio

Open http://localhost:3333 in your browser.

#### Product 1: Magnesium Glycinate
- Click **Products** → **Create new**
- **Name:** Magnesium Glycinate
- **Slug:** Click "Generate" (will make: magnesium-glycinate)
- **Tagline:** Sleep deeper, stress less
- **Description:** Premium magnesium glycinate supports relaxation, restful sleep, and muscle recovery. Highly bioavailable form for optimal absorption. Gentle on digestion. 400mg per serving.
- **Price:** 24.99
- **Images:** Upload `magnesium_bottle.png` from artifacts folder
- **Ingredients:** Add:
  - Magnesium (as Glycinate) 400mg
  - Rice flour (vegetarian capsule)
- **In Stock:** ✅ Checked
- **Featured:** ✅ Checked
- Click **Publish**

#### Product 2: Zinc Picolinate
- Create new product
- **Name:** Zinc Picolinate
- **Slug:** Generate
- **Tagline:** Strengthen your foundation
- **Description:** High-potency zinc picolinate supports immune function, skin health, and cellular metabolism. Superior absorption form for maximum effectiveness. 50mg per serving.
- **Price:** 18.99
- **Images:** Upload `zinc_bottle.png`
- **Ingredients:**
  - Zinc (as Picolinate) 50mg
  - Rice flour (vegetarian capsule)
- **In Stock:** ✅ Checked
- **Featured:** ✅ Checked
- Click **Publish**

#### Product 3: Ashwagandha KSM-66®
- Create new product
- **Name:** Ashwagandha KSM-66®
- **Slug:** Generate
- **Tagline:** Balance from within
- **Description:** Clinically studied KSM-66® Ashwagandha root extract supports stress management, balanced energy, and hormonal harmony. Organic, full-spectrum extract with 5% withanolides. 600mg per serving.
- **Price:** 29.99
- **Images:** Upload `ashwagandha_bottle.png`
- **Ingredients:**
  - Organic Ashwagandha Root Extract (KSM-66®) 600mg
  - Standardized to 5% withanolides
- **In Stock:** ✅ Checked
- **Featured:** ✅ Checked
- Click **Publish**

### Step 9: Start Development Server

In a new terminal:

```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
npm run dev
```

Server will start at http://localhost:5000

### Step 10: Enable Stripe Tax

1. Go to https://dashboard.stripe.com/test/settings/tax
2. Click **Get started** on Stripe Tax
3. Set business location: **Colorado, USA**
4. Enable automatic tax calculation
5. That's it! Tax will be calculated automatically based on customer location

---

## ✅ You're Done!

Your e-commerce platform is now ready! You can:
- ✅ Browse products at http://localhost:5000/shop
- ✅ Add items to cart
- ✅ Test checkout with Stripe test card: **4242 4242 4242 4242**

---

## 📸 Product Images

The three product images have been generated and are in the artifacts folder:
- `magnesium_bottle.png`
- `zinc_bottle.png`  
- `ashwagandha_bottle.png`

Upload these when creating products in Sanity Studio!

---

## 🧪 Testing Stripe Payments

**Test Card Numbers:**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires authentication: `4000 0025 0000 3155`

**Any future expiry date, any 3-digit CVC, any ZIP code**

---

## 🔧 Troubleshooting

**Sanity Studio won't start:**
```bash
cd sanity
rm -rf node_modules
npm install
npx sanity dev
```

**Products don't appear:**
- Make sure products are **Published** (not drafts) in Sanity Studio
- Check browser console for errors
- Verify SANITY_PROJECT_ID in `.env` matches your actual project ID

**Database errors:**
- Verify migration ran successfully in Supabase SQL Editor
- Check SUPABASE_URL and keys in `.env`

---

## 📱 Next Steps

Already done? Great! Next you can:
1. Customize product descriptions
2. Add more products
3. Create product categories
4. Test the complete purchase flow
5. Deploy to production!
