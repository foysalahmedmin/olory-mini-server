import prisma from "../../../prisma/client";
import { TCustomer } from "./customer.type";

export const createCustomer = async (userId: number, payload: TCustomer) => {
  const customer = await prisma.customer.create({
    data: {
      userId: userId,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
    },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { role: "customer" },
  });

  return customer;
};

export const getCustomers = async () => {
  return await prisma.customer.findMany();
};

export const getCustomer = async (id: number) => {
  return await prisma.customer.findUnique({
    where: { id },
  });
};

export const updateCustomer = async (id: number, data: any) => {
  return await prisma.customer.update({ where: { id }, data });
};

export const deleteCustomer = async (id: number) => {
  return await prisma.customer.delete({ where: { id } });
};
