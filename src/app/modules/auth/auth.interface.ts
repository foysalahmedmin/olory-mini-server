export interface TSignIn {
  email: string;
  password: string;
}

export interface TSignUp {
  name: string;
  phone: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

export interface TChangePassword {
  email: string;
  current_password: string;
  new_password: string;
}

export interface TForgetPassword {
  email: string;
}

export interface TResetPassword {
  email: string;
  password: string;
}

export interface TJwtPayload {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: 'user' | 'admin';
}
