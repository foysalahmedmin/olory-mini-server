import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import * as CategoryControllers from './category.controller';
import * as CategoryValidations from './category.validation';

const router = express.Router();

router.get(
  '/',
  auth('admin', 'user', 'customer'),
  CategoryControllers.getCategories,
);

router.get(
  '/with-products',
  auth('admin', 'user', 'customer'),
  CategoryControllers.getCategoriesWithProducts,
);

router.get(
  '/:id',
  auth('admin', 'user', 'customer'),
  CategoryControllers.getCategory,
);

router.get(
  '/:id/with-products',
  auth('admin', 'user', 'customer'),
  CategoryControllers.getCategoryWithProducts,
);

router.post(
  '/',
  auth('admin'),
  validateRequest(CategoryValidations.categorySchema),
  CategoryControllers.createCategory,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(CategoryValidations.categorySchema.partial()),
  CategoryControllers.updateCategory,
);

router.delete('/:id', auth('admin'), CategoryControllers.deleteCategory);

export default router;
