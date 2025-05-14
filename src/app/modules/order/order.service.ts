import { Session } from 'express-session';
import prisma from '../../../prisma/client';

export const checkout = async (session: Session, customerId: number) => {
  const cart = session.cart || [];
  if (!cart.length) throw new Error('Cart is empty');

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const result = await prisma.order.create({
    data: {
      customerId,
      totalAmount,
      items: {
        create: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: { items: true },
  });

  if (!result) throw new Error('Failed to create order');
  session.cart = [];

  return result;
};

export const getOrders = async () => {
  const result = await prisma.order.findMany({ include: { items: true } });
  return result;
};

export const getOrder = async (id: number) => {
  return await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
};

export const deleteOrder = async (id: number) => {
  return await prisma.order.delete({ where: { id } });
};
