import { z } from 'zod';

export const orderSchema = z.object({
  body: z.object({
    customerId: z.number().int(),
  }),
  session: z.object({
    cart: z
      .array(
        z.object({
          productId: z.number().int(),
          quantity: z.number().int().min(1),
          price: z.number().min(0),
        }),
      )
      .min(1, 'Order must have at least one item'),
  }),
});
