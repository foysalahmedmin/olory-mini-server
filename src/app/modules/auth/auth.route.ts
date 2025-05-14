import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import * as AuthControllers from './auth.controller';
import * as AuthValidations from './auth.validation';

const router = express.Router();

router.post(
  '/signin',
  validateRequest(AuthValidations.signinSchema),
  AuthControllers.signIn,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenSchema),
  AuthControllers.refreshToken,
);

router.patch(
  '/change-password',
  auth('user', 'customer', 'admin'),
  validateRequest(AuthValidations.changePasswordSchema),
  AuthControllers.changePassword,
);

router.post(
  '/forget-password',
  validateRequest(AuthValidations.forgetPasswordSchema),
  AuthControllers.forgetPassword,
);

router.patch(
  '/reset-password',
  validateRequest(AuthValidations.resetPasswordSchema),
  AuthControllers.resetPassword,
);
