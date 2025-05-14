import express from 'express';
import auth from '../../middlewares/auth.middleware';
import validation from '../../middlewares/validation.middleware';
import * as OrderControllers from './order.controller';
import * as OrderValidations from './order.validation';

const router = express.Router();

router.get('/', auth('admin'), OrderControllers.getOrders);

router.get('/:id', auth('admin', 'customer'), OrderControllers.getOrder);

router.post(
  '/checkout',
  auth('customer'),
  validation(OrderValidations.orderSchema),
  OrderControllers.checkout,
);

router.delete('/:id', auth('admin'), OrderControllers.deleteOrder);

export default router;
