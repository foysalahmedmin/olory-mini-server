import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import * as ProductControllers from './product.controller';
import * as ProductValidations from './product.validation';

const router = express.Router();

router.get('/', ProductControllers.getProducts);

router.get('/:id', ProductControllers.getProduct);

router.post(
  '/',
  auth('admin'),
  validateRequest(ProductValidations.productSchema),
  ProductControllers.createProduct,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(ProductValidations.productSchema.partial()),
  ProductControllers.updateProduct,
);

router.delete('/:id', auth('admin'), ProductControllers.deleteProduct);

export default router;
