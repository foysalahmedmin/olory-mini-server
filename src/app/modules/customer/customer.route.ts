import express from 'express';
import auth from '../../middlewares/auth.middleware';
import validation from '../../middlewares/validation.middleware';
import * as CustomerControllers from './customer.controller';
import * as CustomerValidations from './customer.validation';

const router = express.Router();

router.get('/', auth('admin'), CustomerControllers.getCustomers);

router.get('/:id', auth('admin', 'customer'), CustomerControllers.getCustomer);

router.post(
  '/',
  auth('user'),
  validation(CustomerValidations.customerSchema),
  CustomerControllers.createCustomer,
);

router.patch(
  '/:id',
  auth('admin', 'customer'),
  validation(CustomerValidations.customerSchema.partial()),
  CustomerControllers.updateCustomer,
);

router.delete('/:id', auth('admin'), CustomerControllers.deleteCustomer);

export default router;
