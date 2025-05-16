export interface TUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'customer' | 'admin';
  status: 'inProgress' | 'blocked';
  isDeleted: boolean;
}
