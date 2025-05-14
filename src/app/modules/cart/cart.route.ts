import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import * as CartControllers from './cart.controller';
import * as CartValidations from './cart.validation';

const router = express.Router();

router.get('/', CartControllers.getCart);

router.post(
  '/add',
  validateRequest(CartValidations.cartSchema),
  CartControllers.addToCart,
);

router.delete(
  '/remove',
  validateRequest(CartValidations.cartSchema),
  CartControllers.removeFromCart,
);

export default router;
