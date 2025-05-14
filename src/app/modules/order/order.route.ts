import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import * as OrderControllers from './order.controller';
import * as OrderValidations from './order.validation';

const router = express.Router();

router.get('/', auth('admin'), OrderControllers.getOrders);

router.get('/:id', auth('admin', 'customer'), OrderControllers.getOrder);

router.post(
  '/checkout',
  auth('customer'),
  validateRequest(OrderValidations.orderSchema),
  OrderControllers.checkout,
);

router.delete('/:id', auth('admin'), OrderControllers.deleteOrder);

export default router;
