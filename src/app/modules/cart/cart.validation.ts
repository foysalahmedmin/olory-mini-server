import { z } from 'zod';

export const cartSchema = z.object({
  session: z
    .object({
      cart: z
        .array(
          z.object({
            productId: z.number().int().optional(),
            quantity: z.number().int().min(1).optional(),
            price: z.number().min(0).optional(),
          }),
        )
        .optional(),
    })
    .optional(),
});
