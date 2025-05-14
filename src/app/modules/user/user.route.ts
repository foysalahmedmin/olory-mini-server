import express from 'express';
import auth from '../../middlewares/auth.middleware';
import validation from '../../middlewares/validation.middleware';
import * as UserControllers from './user.controller';
import * as UserValidations from './user.validation';

const router = express.Router();

router.get('/', auth('admin', 'user', 'customer'), UserControllers.getUsers);

router.get('/:id', auth('admin', 'user', 'customer'), UserControllers.getUser);

router.patch(
  '/:id',
  auth('admin'),
  validation(UserValidations.userSchema.partial()),
  UserControllers.updateUser,
);

router.delete('/:id', auth('admin'), UserControllers.deleteUser);

router.get('/self', auth('admin', 'user', 'customer'), UserControllers.getSelf);

router.patch(
  '/self',
  auth('admin', 'user', 'customer'),
  validation(UserValidations.userSchema.partial()),
  UserControllers.updateSelf,
);

export default router;
