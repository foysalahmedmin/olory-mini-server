import prisma from '../../../prisma/client';
import { Cart } from './cart.interface';

export const addToCart = async (
  session: any,
  { productId, quantity }: { productId: number; quantity: number },
) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error('Product not found');

  if (!session.cart) session.cart = [];

  const existing = session.cart.find(
    (item: Cart) => item.productId === productId,
  );
  if (existing) {
    existing.quantity += quantity;
  } else {
    session.cart.push({ productId, quantity, price: product.price });
  }

  return session.cart;
};
