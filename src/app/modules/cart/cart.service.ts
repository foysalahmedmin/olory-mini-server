import { Session } from "express-session";
import prisma from "../../../prisma/client";
import { TCartItem } from "./cart.type";

export const getCart = async (session: Session) => {
  const cart = session.cart || [];
  const total = cart.reduce(
    (sum: number, item: TCartItem) => sum + item.quantity * item.price,
    0,
  );
  return { items: cart, total };
};

export const addToCart = async (
  session: Session,
  { productId, quantity }: { productId: number; quantity: number },
) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Product not found");

  if (!session.cart) session.cart = [];

  const existing = session.cart.find(
    (item: TCartItem) => item.productId === productId,
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    session.cart.push({
      productId,
      quantity,
      price: product.price,
    });
  }

  const total = session.cart.reduce(
    (sum: number, item: TCartItem) => sum + item.quantity * item.price,
    0,
  );

  return { items: session.cart, total };
};

export const removeFromCart = async (session: Session, productId: number) => {
  if (!session.cart) return { items: [], total: 0 };

  const updatedCart = (session.cart as TCartItem[]).filter(
    (item) => item.productId !== productId,
  );

  session.cart = updatedCart;

  const total = session.cart.reduce(
    (sum: number, item: TCartItem) => sum + item.quantity * item.price,
    0,
  );

  return { items: session.cart, total };
};
