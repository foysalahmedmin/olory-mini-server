import prisma from '../../../prisma/client';
import { TProduct, TProductQuery } from './product.interface';

export const getProducts = async (filters: TProductQuery) => {
  const { category, minPrice, maxPrice, rating, search } = filters;

  return await prisma.product.findMany({
    where: {
      AND: [
        category ? { category: { name: category } } : {},
        minPrice ? { price: { gte: parseFloat(minPrice) } } : {},
        maxPrice ? { price: { lte: parseFloat(maxPrice) } } : {},
        rating ? { rating: { gte: parseFloat(rating) } } : {},
        search ? { name: { contains: search, mode: 'insensitive' } } : {},
      ],
    },
    include: { category: true },
  });
};

export const getProduct = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
};

export const createProduct = async (data: TProduct) => {
  return await prisma.product.create({ data });
};

export const updateProduct = async (id: number, data: any) => {
  return await prisma.product.update({ where: { id }, data });
};

export const deleteProduct = async (id: number) => {
  return await prisma.product.delete({ where: { id } });
};
