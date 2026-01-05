import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

if (!process.env.SANITY_PROJECT_ID) {
    throw new Error('Missing SANITY_PROJECT_ID environment variable');
}

if (!process.env.SANITY_DATASET) {
    throw new Error('Missing SANITY_DATASET environment variable');
}

export const sanityClient = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: process.env.NODE_ENV === 'production',
});

// Image URL builder for transforming Sanity images
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
    return builder.image(source);
}

// Product queries
export const productQueries = {
    // Get all products
    getAllProducts: async () => {
        return sanityClient.fetch(`
      *[_type == "product" && !(_id in path("drafts.**"))] | order(orderRank) {
        _id,
        name,
        slug,
        description,
        price,
        salePrice,
        images,
        category->{
          _id,
          name,
          slug
        },
        ingredients,
        inStock,
        featured,
        "tagline": coalesce(tagline, ""),
        seo
      }
    `);
    },

    // Get product by slug
    getProductBySlug: async (slug: string) => {
        return sanityClient.fetch(
            `
      *[_type == "product" && slug.current == $slug][0] {
        _id,
        name,
        slug,
        description,
        price,
        salePrice,
        images,
        category->{
          _id,
          name,
          slug
        },
        ingredients,
        inStock,
        featured,
        "tagline": coalesce(tagline, ""),
        seo,
        relatedProducts[]->{
          _id,
          name,
          slug,
          price,
          salePrice,
          images[0]
        }
      }
    `,
            { slug }
        );
    },

    // Get featured products
    getFeaturedProducts: async () => {
        return sanityClient.fetch(`
      *[_type == "product" && featured == true && !(_id in path("drafts.**"))] | order(orderRank) {
        _id,
        name,
        slug,
        description,
        price,
        salePrice,
        images,
        category->{
          _id,
          name,
          slug
        },
        "tagline": coalesce(tagline, "")
      }
    `);
    },

    // Get products by category
    getProductsByCategory: async (categorySlug: string) => {
        return sanityClient.fetch(
            `
      *[_type == "product" && category->slug.current == $categorySlug && !(_id in path("drafts.**"))] | order(orderRank) {
        _id,
        name,
        slug,
        description,
        price,
        salePrice,
        images,
        category->{
          _id,
          name,
          slug
        },
        "tagline": coalesce(tagline, "")
      }
    `,
            { categorySlug }
        );
    },

    // Get all categories
    getAllCategories: async () => {
        return sanityClient.fetch(`
      *[_type == "category" && !(_id in path("drafts.**"))] | order(orderRank) {
        _id,
        name,
        slug,
        description
      }
    `);
    },
};
