export interface Book {
  _id: string;
  title: string;
  author: string;
  pages: number;
  category: string;
  description: string;
  photo?: string;
  photoUrl?: string;
  slug: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  priceDiscount?: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  priceAfterDiscount?: number;
  priceDiscountPercent?: number;
}
