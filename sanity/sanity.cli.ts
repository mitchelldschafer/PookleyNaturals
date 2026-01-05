import { defineCli } from 'sanity/cli';

export default defineCli({
    api: {
        projectId: process.env.SANITY_PROJECT_ID || '',
        dataset: process.env.SANITY_DATASET || 'production',
    },
});
