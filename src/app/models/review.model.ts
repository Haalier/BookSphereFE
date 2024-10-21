import { User } from './user.model';

export interface Review {
  _id?: string;
  review: string;
  rating: number;
  book: string;
  user: string | User;
  createdAt?: string;
  updatedAt?: string;
}
