import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import * as UserControllers from './user.controller';
import * as UserValidations from './user.validation';

const router = express.Router();

router.get('/', auth('admin', 'user', 'customer'), UserControllers.getUsers);

router.get('/:id', auth('admin', 'user', 'customer'), UserControllers.getUser);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(UserValidations.userSchema.partial()),
  UserControllers.updateUser,
);

router.delete('/:id', auth('admin'), UserControllers.deleteUser);

router.get('/self', auth('admin', 'user', 'customer'), UserControllers.getSelf);

router.patch(
  '/self',
  auth('admin', 'user', 'customer'),
  validateRequest(UserValidations.userSchema.partial()),
  UserControllers.updateSelf,
);

export default router;
