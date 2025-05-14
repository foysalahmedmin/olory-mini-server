import prisma from '../../../prisma/client';

export const getCategories = async () => {
  return await prisma.category.findMany();
};

export const getCategory = async (id: number) => {
  return await prisma.category.findUnique({ where: { id } });
};

export const getCategoriesWithProducts = async () => {
  return await prisma.category.findMany({ include: { products: true } });
};

export const getCategoryWithProducts = async (id: number) => {
  return await prisma.category.findUnique({
    where: { id },
    include: { products: true },
  });
};

export const createCategory = async (data: any) => {
  return await prisma.category.create({ data });
};

export const updateCategory = async (id: number, data: any) => {
  return await prisma.category.update({ where: { id }, data });
};

export const deleteCategory = async (id: number) => {
  return await prisma.category.delete({ where: { id } });
};
