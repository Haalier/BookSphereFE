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

export interface UserByAdmin{
  _id?: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}