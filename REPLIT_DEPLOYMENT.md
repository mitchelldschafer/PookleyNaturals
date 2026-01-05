# Deploying PookleyNaturals to Replit

Your e-commerce infrastructure has been successfully pushed to GitHub! Now you can deploy it to Replit for live web hosting.

## 🚀 Quick Deployment Steps

### Step 1: Pull Latest Changes in Replit

Since your project was created in Replit and is already connected to GitHub:

1. Go to [Replit](https://replit.com) and open your **PookleyNaturals** Repl
2. Click the **Version Control** tab (Git icon on left sidebar)
3. Click **Pull** to get the latest changes from GitHub
4. Replit will automatically sync all the new e-commerce files!

> **Note:** If you don't see a Version Control tab, your Repl may not be connected to GitHub. In that case, link it by going to the Version Control tab and connecting to `https://github.com/mitchelldschafer/PookleyNaturals`

### Step 2: Configure Environment Variables in Replit

In your existing Repl:

1. Click the **🔒 Secrets** tab (lock icon in left sidebar)
2. Add each environment variable from your `.env` file:

**Required Secrets:**
```
SANITY_PROJECT_ID=your_actual_sanity_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_actual_sanity_token
SANITY_API_VERSION=2024-01-01

SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_actual_anon_key
SUPABASE_SERVICE_KEY=your_actual_service_key

STRIPE_PUBLIC_KEY=pk_test_xxxxx (or pk_live for production)
STRIPE_SECRET_KEY=sk_test_xxxxx (or sk_live for production)
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

NODE_ENV=production
PORT=5000
```

> **Note:** Don't add `VITE_*` variables to Replit Secrets - those will be handled automatically during build.

### Step 3: Configure Replit Run Command

The `.replit` file should already be configured, but verify it has:

```toml
run = "npm run build && npm start"

[nix]
channel = "stable-24_05"

[deployment]
run = ["sh", "-c", "npm run build && npm start"]
deploymentTarget = "cloudrun"
```

### Step 4: Install Dependencies

Replit should auto-install, but if not:
```bash
npm install
```

### Step 5: Deploy

1. Click the **Deploy** button (rocket icon) in Replit
2. Choose **Production** deployment
3. Replit will:
   - Install dependencies
   - Build the Vite frontend
   - Bundle the server
   - Deploy to Replit's infrastructure
4. You'll get a live URL like: `https://pookleynaturals.username.repl.co`

### Step 6: Configure Stripe Webhook (Production)

After deployment:

1. Copy your live Replit URL
2. Go to [Stripe Dashboard](https://dashboard.stripe.com) → **Developers** → **Webhooks**
3. Click **Add endpoint**
4. Endpoint URL: `https://your-repl-url.repl.co/api/webhooks/stripe`
5. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
6. Click **Add endpoint**
7. Copy the **Signing secret** (starts with `whsec_`)
8. Update in Replit Secrets: `STRIPE_WEBHOOK_SECRET`
9. Restart your Repl

---

## 🔄 Updating Your Deployment

Whenever you make changes locally and push to GitHub:

1. **Commit and push locally:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Pull in Replit:**
   - Go to your Repl
   - Click the **Version Control** tab
   - Click **Pull** button
   - Replit will automatically:
     - Download new files
     - Install new dependencies
     - Restart the server

That's it! Your live site updates automatically.

---

## 🌐 Custom Domain (Optional)

To use your own domain (e.g., `pookleynaturals.com`):

1. In Replit, go to your deployed Repl
2. Click **Deploy** → **Custom domains**
3. Enter your domain
4. Follow DNS instructions to add CNAME records
5. Wait for DNS propagation (~24 hours)

**Example DNS setup:**
```
Type: CNAME
Name: www
Value: your-repl-url.repl.co
```

---

## ✅ Deployment Checklist

Before going live:

### Pre-Launch
- [ ] All products added to Sanity CMS
- [ ] Product images uploaded
- [ ] Supabase database migration run
- [ ] Environment variables configured in Replit Secrets
- [ ] Test checkout with Stripe test cards

### Switch to Production
- [ ] Switch Stripe from test mode to live mode
- [ ] Update Stripe keys in Replit Secrets (use `pk_live_` and `sk_live_`)
- [ ] Configure Stripe webhook for production URL
- [ ] Enable Stripe Tax for live mode
- [ ] Test real purchase with real card (small amount)
- [ ] Verify order appears in Supabase

### Post-Launch
- [ ] Set up monitoring (Replit has built-in analytics)
- [ ] Configure custom domain (if desired)
- [ ] Set up email notifications for orders
- [ ] Create backup strategy for database

---

## 🔐 Security Notes

**In Replit Secrets (never in code):**
- ✅ All API keys
- ✅ Database credentials
- ✅ Stripe secret keys

**Safe to expose (in code):**
- ✅ `VITE_*` prefixed variables (public client config)
- ✅ Stripe publishable key (`pk_test_` or `pk_live_`)
- ✅ Supabase anon key

---

## 📊 Monitoring Your Site

**Replit provides:**
- Real-time logs (Console tab)
- Performance metrics (Analytics)
- Uptime monitoring
- Error tracking

**Additional monitoring:**
- Stripe Dashboard - payment analytics
- Supabase Dashboard - database usage
- Sanity Studio - content updates

---

## 🆘 Troubleshooting

**Build fails:**
```bash
# In Replit Shell
npm install
npm run build
```

**Server won't start:**
- Check Secrets are all configured
- Verify PORT is set to 5000
- Check Console logs for errors

**Products don't appear:**
- Verify Sanity credentials in Secrets
- Check products are Published (not drafts)
- Test Sanity API: `https://your-project.api.sanity.io/v2024-01-01/data/query/production?query=*[_type == "product"]`

**Payments fail:**
- Verify Stripe is in correct mode (test vs live)
- Check webhook is configured
- Verify webhook secret matches

---

## 🎉 You're Live!

Once deployed, your PookleyNaturals e-commerce site will be live at your Replit URL. You can share it, start taking orders, and scale as needed!

**Repository:** https://github.com/mitchelldschafer/PookleyNaturals
**Tech Stack:** React + Vite + Express + Sanity + Supabase + Stripe

Ready to grow! 🌱
