import { defineField, defineType } from 'sanity';

export const productType = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Product Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
            description: 'Short, catchy tagline for the product',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (Rule) => Rule.required().positive(),
        }),
        defineField({
            name: 'salePrice',
            title: 'Sale Price',
            type: 'number',
            description: 'Optional discounted price',
            validation: (Rule) => Rule.positive(),
        }),
        defineField({
            name: 'images',
            title: 'Product Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative Text',
                            description: 'Important for SEO and accessibility',
                        },
                    ],
                },
            ],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
        }),
        defineField({
            name: 'ingredients',
            title: 'Key Ingredients',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of main ingredients',
        }),
        defineField({
            name: 'inStock',
            title: 'In Stock',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'featured',
            title: 'Featured Product',
            type: 'boolean',
            description: 'Display this product prominently on the homepage',
            initialValue: false,
        }),
        defineField({
            name: 'relatedProducts',
            title: 'Related Products',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'product' }],
                },
            ],
        }),
        defineField({
            name: 'orderRank',
            title: 'Order Rank',
            type: 'string',
            hidden: true,
        }),
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                {
                    name: 'metaTitle',
                    type: 'string',
                    title: 'Meta Title',
                    validation: (Rule) => Rule.max(60),
                },
                {
                    name: 'metaDescription',
                    type: 'text',
                    title: 'Meta Description',
                    rows: 3,
                    validation: (Rule) => Rule.max(160),
                },
                {
                    name: 'metaKeywords',
                    type: 'array',
                    title: 'Meta Keywords',
                    of: [{ type: 'string' }],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'tagline',
            media: 'images.0',
            inStock: 'inStock',
        },
        prepare(selection) {
            const { title, subtitle, media, inStock } = selection;
            return {
                title: title,
                subtitle: !inStock ? '⚠️ Out of Stock - ' + subtitle : subtitle,
                media: media,
            };
        },
    },
    orderings: [
        {
            title: 'Name A-Z',
            name: 'nameAsc',
            by: [{ field: 'name', direction: 'asc' }],
        },
        {
            title: 'Price Low-High',
            name: 'priceAsc',
            by: [{ field: 'price', direction: 'asc' }],
        },
        {
            title: 'Price High-Low',
            name: 'priceDesc',
            by: [{ field: 'price', direction: 'desc' }],
        },
    ],
});

export const categoryType = defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Category Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'orderRank',
            title: 'Order Rank',
            type: 'string',
            hidden: true,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'description',
        },
    },
});
