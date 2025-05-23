import express from 'express';
import auth from '../../middlewares/auth.middleware';
import validation from '../../middlewares/validation.middleware';
import * as CategoryControllers from './category.controller';
import * as CategoryValidations from './category.validation';

const router = express.Router();

router.get('/', CategoryControllers.getCategories);

router.get('/with-products', CategoryControllers.getCategoriesWithProducts);

router.get('/:id', CategoryControllers.getCategory);

router.get('/:id/with-products', CategoryControllers.getCategoryWithProducts);

router.post(
  '/',
  auth('admin'),
  validation(CategoryValidations.categorySchema),
  CategoryControllers.createCategory,
);

router.patch(
  '/:id',
  auth('admin'),
  validation(CategoryValidations.categorySchema.partial()),
  CategoryControllers.updateCategory,
);

router.delete('/:id', auth('admin'), CategoryControllers.deleteCategory);

export default router;
