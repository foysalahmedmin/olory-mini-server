import { z } from 'zod';

export const productSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number(),
    rating: z.number().optional(),
    categoryId: z.number().int(),
  }),
});
