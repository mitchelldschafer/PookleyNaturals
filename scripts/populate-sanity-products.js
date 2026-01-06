#!/usr/bin/env node
/**
 * Script to populate Sanity with the 3 product catalog items
 * Run this with: node scripts/populate-sanity-products.js
 */

import { createClient } from '@sanity/client';
import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Sanity client
const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || 'production',
    apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

// Product data
const products = [
    {
        _type: 'product',
        name: 'Magnesium Glycinate',
        slug: { _type: 'slug', current: 'magnesium-glycinate' },
        tagline: 'Sleep deeper, stress less',
        description: 'Premium magnesium glycinate supports relaxation, restful sleep, and muscle recovery. Highly bioavailable form for optimal absorption. Gentle on digestion. 400mg per serving.',
        price: 24.99,
        ingredients: [
            'Magnesium (as Glycinate) 400mg',
            'Rice flour (vegetarian capsule)',
            'No artificial additives'
        ],
        inStock: true,
        featured: true,
        seo: {
            metaTitle: 'Magnesium Glycinate Supplement | High Absorption Sleep Support',
            metaDescription: 'Premium magnesium glycinate for better sleep, stress relief, and muscle relaxation. 400mg highly bioavailable formula.',
            metaKeywords: ['magnesium glycinate', 'sleep supplement', 'stress relief', 'muscle recovery']
        }
    },
    {
        _type: 'product',
        name: 'Zinc Picolinate',
        slug: { _type: 'slug', current: 'zinc-picolinate' },
        tagline: 'Strengthen your foundation',
        description: 'High-potency zinc picolinate supports immune function, skin health, and cellular metabolism. Superior absorption form for maximum effectiveness. 50mg per serving.',
        price: 18.99,
        ingredients: [
            'Zinc (as Picolinate) 50mg',
            'Rice flour (vegetarian capsule)',
            'Non-GMO'
        ],
        inStock: true,
        featured: true,
        seo: {
            metaTitle: 'Zinc Picolinate 50mg | High Absorption Immune Support',
            metaDescription: 'Premium zinc picolinate for immune health, skin clarity, and metabolic support. Highly bioavailable 50mg formula.',
            metaKeywords: ['zinc supplement', 'immune support', 'zinc picolinate', 'skin health']
        }
    },
    {
        _type: 'product',
        name: 'Ashwagandha KSM-66®',
        slug: { _type: 'slug', current: 'ashwagandha-ksm66' },
        tagline: 'Balance from within',
        description: 'Clinically studied KSM-66® Ashwagandha root extract supports stress management, balanced energy, and hormonal harmony. Organic, full-spectrum extract with 5% withanolides. 600mg per serving.',
        price: 29.99,
        ingredients: [
            'Organic Ashwagandha Root Extract (KSM-66®) 600mg',
            'Standardized to 5% withanolides',
            'Vegan capsule'
        ],
        inStock: true,
        featured: true,
        seo: {
            metaTitle: 'Organic Ashwagandha KSM-66® | Stress & Energy Balance',
            metaDescription: 'Clinically studied KSM-66® ashwagandha for stress relief, balanced energy, and hormone support. 600mg organic extract.',
            metaKeywords: ['ashwagandha', 'KSM-66', 'stress relief', 'adaptogen', 'hormone balance']
        }
    }
];

async function uploadImage(imagePath, altText) {
    try {
        console.log(`  📤 Uploading image: ${imagePath}...`);
        const imageAsset = await client.assets.upload('image', createReadStream(imagePath), {
            filename: imagePath.split('/').pop()
        });

        console.log(`  ✅ Image uploaded: ${imageAsset._id}`);

        return {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: imageAsset._id
            },
            alt: altText
        };
    } catch (error) {
        console.error(`  ❌ Failed to upload image ${imagePath}:`, error.message);
        return null;
    }
}

async function createProduct(productData, imagePath) {
    try {
        console.log(`\n📦 Creating product: ${productData.name}...`);

        // Upload product image
        let images = [];
        if (imagePath) {
            const image = await uploadImage(imagePath, productData.name);
            if (image) {
                images = [image];
            }
        }

        // Create product document
        const product = await client.create({
            ...productData,
            images: images.length > 0 ? images : undefined,
            orderRank: productData.name // For ordering in Sanity Studio
        });

        console.log(`✅ Created: ${product.name} (ID: ${product._id})`);
        return product;
    } catch (error) {
        console.error(`❌ Failed to create ${productData.name}:`, error.message);
        throw error;
    }
}

async function main() {
    console.log('🚀 Starting Sanity product population...\n');
    console.log('📋 Configuration:');
    console.log(`   Project ID: ${process.env.SANITY_PROJECT_ID}`);
    console.log(`   Dataset: ${process.env.SANITY_DATASET || 'production'}`);
    console.log('');

    // Check if we have the required env vars
    if (!process.env.SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
        console.error('❌ Missing required environment variables:');
        console.error('   SANITY_PROJECT_ID and SANITY_API_TOKEN must be set');
        console.error('\nMake sure your .env file is configured or Replit Secrets are set.');
        process.exit(1);
    }

    try {
        // Test connection
        console.log('🔌 Testing Sanity connection...');
        await client.fetch('*[_type == "product"][0]');
        console.log('✅ Connected to Sanity!\n');

        // Check if products already exist
        const existingProducts = await client.fetch('*[_type == "product"]');
        if (existingProducts.length > 0) {
            console.log(`⚠️  Found ${existingProducts.length} existing product(s)`);
            console.log('   This script will create additional products.');
            console.log('   To start fresh, delete existing products in Sanity Studio first.\n');
        }

        // Image paths (correct absolute path)
        const imageDir = '/Users/mitchellschafer/.gemini/antigravity/brain/42cc28ce-63c7-4b54-bbe5-26fa4c01648e';
        const imagePaths = [
            join(imageDir, 'magnesium_bottle_1767603597708.png'),
            join(imageDir, 'zinc_bottle_1767603612443.png'),
            join(imageDir, 'ashwagandha_bottle_1767603626704.png')
        ];

        // Create products
        const createdProducts = [];
        for (let i = 0; i < products.length; i++) {
            const product = await createProduct(products[i], imagePaths[i]);
            createdProducts.push(product);
        }

        console.log('\n\n🎉 Success! Created all products:');
        createdProducts.forEach(p => {
            console.log(`   ✅ ${p.name} - $${p.price}`);
        });

        console.log('\n📝 Next steps:');
        console.log('   1. Open Sanity Studio: cd sanity && npx sanity dev');
        console.log('   2. View your products at http://localhost:3333');
        console.log('   3. Products are auto-published and ready to use!');
        console.log('\n   Or test the API:');
        console.log(`   curl "https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v${process.env.SANITY_API_VERSION}/data/query/production?query=*[_type == 'product']"`);

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        console.error('\nTroubleshooting:');
        console.error('   1. Verify SANITY_PROJECT_ID and SANITY_API_TOKEN are correct');
        console.error('   2. Ensure API token has "Editor" or "Admin" permissions');
        console.error('   3. Check that your Sanity project exists');
        process.exit(1);
    }
}

// Run the script
main();
