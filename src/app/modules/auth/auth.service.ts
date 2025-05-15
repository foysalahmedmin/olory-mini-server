import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import prisma from '../../../prisma/client';
import AppError from '../../builder/AppError';
import config from '../../config';
import { sendEmail } from '../../utils/sendEmail';
import {
  TChangePassword,
  TForgetPassword,
  TJwtPayload,
  TResetPassword,
  TSignIn,
  TSignUp,
} from './auth.interface';
import { createToken, isPasswordMatched, verifyToken } from './auth.utils';

// === Find user by id
export const isUserExist = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id, isDeleted: false },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
      status: true,
      isDeleted: true,
    },
  });
};

// === Find user by custom email field
export const isUserExistByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
      isDeleted: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
      status: true,
      isDeleted: true,
    },
  });
};

export const signIn = async (payload: TSignIn) => {
  const user = await isUserExistByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted!');
  }

  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
  }

  if (!(await isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');
  }

  const jwtPayload: TJwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_secret_expires_in,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_secret_expires_in,
  );

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    info: jwtPayload,
  };
};

export const signUp = async (payload: TSignUp) => {
  const hashedPassword = await bcrypt.hash(
    payload.password || config.default_password,
    Number(config.bcrypt_salt_rounds),
  );
  payload.password = hashedPassword;
  payload.role = payload.role || 'user';

  const exist = await isUserExistByEmail(payload.email);
  if (exist) {
    throw new AppError(httpStatus.CONFLICT, 'User already exists!');
  }

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role,
    },
  });

  const jwtPayload: TJwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_secret_expires_in,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_secret_expires_in,
  );

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    info: jwtPayload,
  };
};

export const refreshToken = async (token: string) => {
  const { email } = verifyToken(token, config.jwt_refresh_secret);

  const user = await isUserExistByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted!');
  }

  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
  }

  const jwtPayload: TJwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_secret_expires_in,
  );

  return {
    token: accessToken,
    info: jwtPayload,
  };
};

export const changePassword = async (payload: TChangePassword) => {
  const user = await isUserExistByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (user?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is deleted!');
  }

  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.NOT_FOUND, 'User is blocked!');
  }

  if (!(await isPasswordMatched(payload?.current_password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');
  }

  const hashedNewPassword = await bcrypt.hash(
    payload.new_password,
    Number(config.bcrypt_salt_rounds),
  );

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedNewPassword,
      updatedAt: new Date(),
    },
  });

  return result;
};

export const forgetPassword = async (payload: TForgetPassword) => {
  const user = await isUserExistByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted!');
  }

  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
  }

  const jwtPayload: TJwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_secret_expires_in,
  );

  const resetUILink = `${config.reset_password_ui_link}?id=${user.id}&token=${token}`;

  await sendEmail({
    to: user.email,
    subject: 'Olory-Mini Password Change Link',
    text: 'Reset your password within 10 minutes',
    html: resetUILink,
  });

  return null;
};

export const resetPassword = async (payload: TResetPassword, token: string) => {
  const user = await isUserExistByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted!');
  }

  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
  }

  const { email } = verifyToken(token, config.jwt_access_secret);

  if (payload.email !== email) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is forbidden!');
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      updatedAt: new Date(),
    },
  });

  return result;
};
