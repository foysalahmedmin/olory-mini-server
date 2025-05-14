import { z } from 'zod';

export const userValidationSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string().min(6).max(12),
  role: z.enum(['user', 'admin']).optional(),
  status: z.enum(['in-progress', 'blocked']).default('in-progress').optional(),
  isDeleted: z.boolean().default(false).optional(),
});
