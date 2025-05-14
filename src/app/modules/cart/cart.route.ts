import express from 'express';
import validation from '../../middlewares/validation.middleware';
import * as CartControllers from './cart.controller';
import * as CartValidations from './cart.validation';

const router = express.Router();

router.get('/', CartControllers.getCart);

router.post(
  '/add',
  validation(CartValidations.cartSchema),
  CartControllers.addToCart,
);

router.delete(
  '/remove',
  validation(CartValidations.cartSchema),
  CartControllers.removeFromCart,
);

export default router;
