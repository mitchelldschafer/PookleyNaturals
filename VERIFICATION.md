# Environment Verification Checklist

## ✅ What to Verify in Replit

### 1. Check Replit Secrets Configuration

In your Replit project:
1. Click the **🔒 Secrets** tab
2. Verify you have ALL of these secrets configured:

**Required Secrets:**
- [ ] `SANITY_PROJECT_ID`
- [ ] `SANITY_DATASET` (should be "production")
- [ ] `SANITY_API_TOKEN`
- [ ] `SANITY_API_VERSION` (should be "2024-01-01")
- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_KEY`
- [ ] `STRIPE_PUBLIC_KEY`
- [ ] `STRIPE_SECRET_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET` (optional for now, required for production)
- [ ] `NODE_ENV` (set to "production" or "development")
- [ ] `PORT` (set to "5000")

### 2. Verify Git Sync in Replit

1. Open **Version Control** tab in Replit
2. Click **Pull** to get latest changes
3. Check that these new files appear:
   - [ ] `server/lib/sanity.ts`
   - [ ] `server/lib/supabase.ts`
   - [ ] `server/lib/stripe.ts`
   - [ ] `sanity/schemas/index.ts`
   - [ ] `supabase/migrations/001_ecommerce_tables.sql`
   - [ ] `QUICK_START.md`
   - [ ] `PRODUCT_CATALOG.md`

### 3. Test Sanity Connection

Run this in Replit Shell to test Sanity connection:

```bash
node -e "
const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});
client.fetch('*[_type == \"product\"]').then(products => {
  console.log('✅ Sanity connection successful!');
  console.log('Products found:', products.length);
  if (products.length === 0) {
    console.log('⚠️  No products yet - add them in Sanity Studio');
  }
}).catch(err => console.error('❌ Sanity error:', err.message));
"
```

### 4. Test Supabase Connection

```bash
node -e "
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
supabase.from('products').select('count').then(({ data, error }) => {
  if (error) {
    console.error('⚠️  Supabase error:', error.message);
    console.log('Have you run the migration? Check QUICK_START.md Step 3');
  } else {
    console.log('✅ Supabase connection successful!');
  }
});
"
```

### 5. Test Stripe Connection

```bash
node -e "
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
stripe.webhooks.constructEvent('test', 'test', 'whsec_test').catch(() => {
  console.log('✅ Stripe loaded successfully');
  console.log('Key type:', process.env.STRIPE_SECRET_KEY.startsWith('sk_test_') ? 'TEST MODE ✓' : 'LIVE MODE');
});
"
```

## 🔧 Common Issues & Fixes

### Issue: "Cannot find module '@sanity/client'"
**Fix:** Run `npm install` in Replit Shell

### Issue: "Sanity connection failed"
**Solution:**
1. Verify `SANITY_PROJECT_ID` matches your Sanity project
2. Check `SANITY_API_TOKEN` has Editor permissions
3. Make sure token is not expired

### Issue: "Supabase table doesn't exist"
**Solution:**
1. Open Supabase Dashboard → SQL Editor
2. Run the migration from `supabase/migrations/001_ecommerce_tables.sql`
3. Verify tables were created in Table Editor

### Issue: "No products found"
**Solution:**
1. Start Sanity Studio: `cd sanity && npx sanity dev`
2. Add products following `PRODUCT_CATALOG.md`
3. Make sure products are **Published** (not drafts)

## 📝 Quick Commands for Replit Shell

```bash
# Install/update dependencies
npm install

# Type check (find TypeScript errors)
npm run check

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## ✅ Full Deployment Checklist

- [ ] All secrets configured in Replit
- [ ] Git pulled latest changes
- [ ] Dependencies installed (`npm install`)
- [ ] Type check passes (`npm run check`)
- [ ] Sanity connection working
- [ ] Supabase migration run
- [ ] Supabase connection working
- [ ] Stripe connection working
- [ ] Products added to Sanity CMS
- [ ] Products appear in Sanity API
- [ ] Dev server runs locally
- [ ] Production build successful
- [ ] Production server runs
- [ ] Can access site at Replit URL

## 🎯 What to Do Right Now

1. **In Replit:** Pull latest changes from Git
2. **In Replit Shell:** Run `npm install`
3. **Run verification tests** (commands above)
4. **Fix any issues** using the troubleshooting guide
5. **Add products** to Sanity Studio
6. **Test the site** at your Replit URL

Let me know which step you're on or if you hit any errors!
