export interface TUser {
  id: number;
  name: string;
  phone: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}
