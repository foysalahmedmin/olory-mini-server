import { z } from 'zod';

export const customerSchema = z.object({
  body: z.object({
    userId: z.number().int().optional(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});
