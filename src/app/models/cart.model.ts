import { Book } from './book.model';

interface Items {
  book: Book;
  quantity: number;
  _id: string;
}

export interface Cart {
  user: string;
  _id: string;
  items: [Items];
  total: number;

  createdAt?: string;
  updatedAt?: string;
}
