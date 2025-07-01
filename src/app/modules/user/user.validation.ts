import { z } from 'zod';

export const userSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(12),
    role: z.enum(['user', 'customer', 'admin']).default('user').optional(),
    status: z
      .enum(['inProgress', 'blocked'])
      .default('inProgress')
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});
