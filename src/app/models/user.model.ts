export interface User {
  _id?: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  photo?: string;
  password?: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
