import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import * as CustomerControllers from './customer.controller';
import * as CustomerValidations from './customer.validation';

const router = express.Router();

router.get('/', auth('admin'), CustomerControllers.getCustomers);

router.get('/:id', auth('admin', 'customer'), CustomerControllers.getCustomer);

router.post(
  '/',
  auth('user'),
  validateRequest(CustomerValidations.customerSchema),
  CustomerControllers.createCustomer,
);

router.patch(
  '/:id',
  auth('admin', 'customer'),
  validateRequest(CustomerValidations.customerSchema.partial()),
  CustomerControllers.updateCustomer,
);

router.delete('/:id', auth('admin'), CustomerControllers.deleteCustomer);

export default router;
