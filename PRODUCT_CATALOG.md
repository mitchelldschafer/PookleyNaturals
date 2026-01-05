# Product Catalog for Pookley Naturals
# Add these products to Sanity Studio

Based on market research (January 2026), here are the three premium supplement products with competitive pricing:

---

## PRODUCT 1: Magnesium Glycinate

**Product Details:**
- **Name:** Magnesium Glycinate
- **Slug:** magnesium-glycinate
- **Tagline:** "Sleep deeper, stress less"
- **Description:** Premium magnesium glycinate supports relaxation, restful sleep, and muscle recovery. Highly bioavailable form for optimal absorption. Gentle on digestion. 400mg per serving.
- **Price:** $24.99

**Key Ingredients:**
- Magnesium (as Glycinate) 400mg
- Rice flour (vegetarian capsule)
- No artificial additives

**Category:** Minerals & Sleep Support

**SEO:**
- Meta Title: Magnesium Glycinate Supplement | High Absorption Sleep Support
- Meta Description: Premium magnesium glycinate for better sleep, stress relief, and muscle relaxation. 400mg highly bioavailable formula.
- Keywords: magnesium glycinate, sleep supplement, stress relief, muscle recovery

**Product Images Needed:**
- Hero image: Magnesium bottle on natural wood surface with lavender
- Lifestyle: Person sleeping peacefully
- Ingredient close-up: Magnesium capsules

**Stock Status:** In Stock
**Featured:** Yes (display on homepage)

---

## PRODUCT 2: Zinc Picolinate

**Product Details:**
- **Name:** Zinc Picolinate  
- **Slug:** zinc-picolinate
- **Tagline:** "Strengthen your foundation"
- **Description:** High-potency zinc picolinate supports immune function, skin health, and cellular metabolism. Superior absorption form for maximum effectiveness. 50mg per serving.
- **Price:** $18.99

**Key Ingredients:**
- Zinc (as Picolinate) 50mg
- Rice flour (vegetarian capsule)
- Non-GMO

**Category:** Immune Support & Minerals

**SEO:**
- Meta Title: Zinc Picolinate 50mg | High Absorption Immune Support
- Meta Description:** Premium zinc picolinate for immune health, skin clarity, and metabolic support. Highly bioavailable 50mg formula.
- Keywords: zinc supplement, immune support, zinc picolinate, skin health

**Product Images Needed:**
- Hero image: Zinc bottle with citrus fruits
- Lifestyle: Active woman outdoors
- Ingredient close-up: Zinc capsules

**Stock Status:** In Stock
**Featured:** Yes

---

## PRODUCT 3: Ashwagandha KSM-66®

**Product Details:**
- **Name:** Ashwagandha KSM-66®
- **Slug:** ashwagandha-ksm66
- **Tagline:** "Balance from within"
- **Description:** Clinically studied KSM-66® Ashwagandha root extract supports stress management, balanced energy, and hormonal harmony. Organic, full-spectrum extract with 5% withanolides. 600mg per serving.
- **Price:** $29.99

**Key Ingredients:**
- Organic Ashwagandha Root Extract (KSM-66®) 600mg
- Standardized to 5% withanolides
- Vegan capsule

**Category:** Adaptogens & Stress Support

**SEO:**
- Meta Title: Organic Ashwagandha KSM-66® | Stress & Energy Balance
- Meta Description: Clinically studied KSM-66® ashwagandha for stress relief, balanced energy, and hormone support. 600mg organic extract.
- Keywords: ashwagandha, KSM-66, stress relief, adaptogen, hormone balance

**Product Images Needed:**
- Hero image: Ashwagandha bottle with fresh ashwagandha root
- Lifestyle: Woman meditating in morning light
- Ingredient close-up: Ashwagandha capsules with root

**Stock Status:** In Stock
**Featured:** Yes

---

## Pricing Strategy

**Market Research Summary:**
- Magnesium supplements: $15-$25 (30-day supply)
- Zinc supplements: $10-$15 (60-capsule bottle)
- Ashwagandha supplements: $15-$30 (60-capsule bottle)

**Our Pricing Position:**
- **Premium positioning** with competitive pricing
- All prices include high-quality ingredients and forms
- Magnesium Glycinate ($24.99) - Mid-premium range
- Zinc Picolinate ($18.99) - Premium but accessible
- Ashwagandha KSM-66 ($29.99) - Premium tier (clinical-grade extract)

---

## Sales Tax Configuration

For Stripe, sales tax will be calculated automatically based on customer location using Stripe Tax.

**Colorado-based company tax setup:**
- Enable Stripe Tax in your Stripe Dashboard
- Set business location: Colorado
- Stripe will automatically calculate and collect sales tax based on:
  - Customer's shipping address
  - State and local tax rates
  - Product taxability rules

**Tax rates by region (approximate):**
- Colorado: 2.9% state + local (varies by city)
- California: 7.25-10.5%
- New York: 4% + local
- No sales tax states: AK, DE, MT, NH, OR

**Implementation:**
Stripe Checkout will automatically handle all tax calculations. No manual configuration needed in our code - just enable Stripe Tax in the dashboard.

---

## Next Steps

1. **Create Sanity Account** and project at https://www.sanity.io/manage
2. **Start Sanity Studio:** `cd sanity && npx sanity dev`
3. **Add these three products** using the details above
4. **Upload product images** (or use generate_image for placeholder images)
5. **Create categories:**
   - "Minerals & Sleep Support"
   - "Immune Support & Minerals"
   - "Adaptogens & Stress Support"

## Image Generation Prompts (if needed)

If you need placeholder images, here are prompts:

**Magnesium:**
"Professional product photography of a premium supplement bottle labeled 'Magnesium Glycinate' on a natural wood surface with dried lavender sprigs, soft morning light, warm neutral tones, zen aesthetic, shallow depth of field"

**Zinc:**
"Professional product photography of a premium supplement bottle labeled 'Zinc Picolinate' with fresh citrus slices, bright natural light, clean white background with sage green accents, modern minimalist aesthetic"

**Ashwagandha:**
"Professional product photography of a premium supplement bottle labeled 'Ashwagandha KSM-66' with fresh ashwagandha root and leaves, warm earthy tones, soft diffused light, natural wellness aesthetic"
