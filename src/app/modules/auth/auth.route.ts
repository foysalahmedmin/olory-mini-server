import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import * as AuthControllers from './auth.controller';
import * as AuthValidations from './auth.validation';

const router = express.Router();

router.post(
  '/signin',
  validateRequest(AuthValidations.signinValidationSchema),
  AuthControllers.signIn,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.patch(
  '/change-password',
  auth('admin', 'student', 'faculty'),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/forget-password',
  validateRequest(AuthValidations.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

router.patch(
  '/reset-password',
  validateRequest(AuthValidations.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);
