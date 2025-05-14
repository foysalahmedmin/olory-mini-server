import prisma from '../../../prisma/client';
import { CartItem } from '../cart/cart.interface';

export const placeOrder = async (customerId: number, cartItems: CartItem[]) => {
  if (!cartItems.length) throw new Error('Cart is empty');

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return await prisma.order.create({
    data: {
      customerId,
      totalAmount,
      items: {
        create: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: { items: true },
  });
};
