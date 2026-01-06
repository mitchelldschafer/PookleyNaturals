#!/usr/bin/env node
/**
 * Script to add Creatine Monohydrate to Sanity
 * Run this with: node scripts/add-creatine.js
 */

import { createClient } from '@sanity/client';
import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Sanity client
const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID || 'wtmqjoaq',
    dataset: process.env.SANITY_DATASET || 'production',
    apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

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

async function main() {
    console.log('🚀 Adding Creatine product...\n');

    if (!process.env.SANITY_API_TOKEN) {
        console.error('❌ Missing SANITY_API_TOKEN.');
        process.exit(1);
    }

    // Creatine Product Data
    const productData = {
        _type: 'product',
        name: 'Creatine Monohydrate',
        slug: { _type: 'slug', current: 'creatine-monohydrate' },
        tagline: 'Pure & Effective Performance',
        description: 'Micronized Creatine Monohydrate for enhanced strength, power, and muscle endurance. Unflavored and easy to mix. 5g per serving.',
        price: 21.99,
        ingredients: [
            'Micronized Creatine Monohydrate 5g',
            'Unflavored',
            'No additives'
        ],
        inStock: true,
        featured: false,
        seo: {
            metaTitle: 'Creatine Monohydrate | Pure Strength & Performance',
            metaDescription: 'Premium micronized creatine monohydrate for muscle growth, strength, and recovery. 5g per serving, unflavored.',
            metaKeywords: ['creatine', 'muscle growth', 'strength', 'workout supplement']
        }
    };

    // Image Path
    const imagePath = '/Users/mitchellschafer/.gemini/antigravity/brain/42cc28ce-63c7-4b54-bbe5-26fa4c01648e/creatine_bottle_1767669274410.png';

    try {
        // 1. Upload Image
        const image = await uploadImage(imagePath, productData.name);

        // 2. Create Product
        const product = await client.create({
            ...productData,
            images: image ? [image] : undefined,
            orderRank: productData.name
        });

        console.log(`\n🎉 Success! Added: ${product.name} (ID: ${product._id})`);
        console.log(`   Price: $${product.price}`);
        console.log(`\n👉 Check your shop page! It should appear instantly.`);

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

main();
