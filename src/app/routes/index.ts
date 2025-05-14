import express from 'express';
import authRouter from '../modules/auth/auth.route';
import cartRouter from '../modules/cart/cart.route';
import categoryRouter from '../modules/category/category.route';
import customerRouter from '../modules/customer/customer.route';
import orderRouter from '../modules/order/order.route';
import productRouter from '../modules/product/product.route';
import userRouter from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/customer',
    route: customerRouter,
  },
  {
    path: '/cart',
    route: cartRouter,
  },
  {
    path: '/category',
    route: categoryRouter,
  },
  {
    path: '/product',
    route: productRouter,
  },
  {
    path: '/order',
    route: orderRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
