import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const reviewSchema = z.object({
  reviewer: z.string(),
  date: z.string(),
  rating: z.number().min(1).max(5),
  text: z.string(),
});

const businessCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/businesses' }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    category: z.string(),
    subCategory: z.string().optional(),
    description: z.string(),
    featuredImage: z.string(),
    logo: z.string(),
    highlights: z.array(z.string()).optional(),
    googleRating: z.number().min(0).max(5),
    googleReviewCount: z.number().optional(),
    googleUrl: z.string().optional(),
    tripadvisorRating: z.number().min(0).max(5).optional(),
    tripadvisorReviewCount: z.number().optional(),
    tripadvisorReviews: z.array(reviewSchema).optional(),
    social: z.object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      website: z.string().optional(),
      tripadvisor: z.string().optional(),
      google: z.string().optional(),
    }).optional(),
    contact: z.object({
      phone: z.string().optional(),
      email: z.string().optional(),
      address: z.string().optional(),
    }).optional(),
    sponsorLevel: z.enum(['bronze', 'silver', 'gold']).default('bronze'),
    reviews: z.array(reviewSchema).optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    openingHours: z.string().optional(),
    priceRange: z.string().optional(),
    servesCuisine: z.string().optional(),
  }),
});

export const collections = {
  'businesses': businessCollection,
};
