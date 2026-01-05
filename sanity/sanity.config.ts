import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { productType, categoryType } from './schemas';

const projectId = process.env.SANITY_PROJECT_ID || '';
const dataset = process.env.SANITY_DATASET || 'production';

export default defineConfig({
    name: 'pookley-naturals',
    title: 'Pookley Naturals CMS',
    projectId,
    dataset,
    plugins: [
        structureTool({
            structure: (S, context) => {
                return S.list()
                    .title('Content')
                    .items([
                        // Orderable Products list
                        orderableDocumentListDeskItem({
                            type: 'product',
                            title: 'Products',
                            S,
                            context,
                        }),
                        S.divider(),
                        // Orderable Categories list
                        orderableDocumentListDeskItem({
                            type: 'category',
                            title: 'Categories',
                            S,
                            context,
                        }),
                    ]);
            },
        }),
        visionTool(),
    ],
    schema: {
        types: [productType, categoryType],
    },
});
