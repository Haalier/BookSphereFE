export interface Book {
  _id?: string;
  title: string;
  author: string;
  pages: number;
  category:
    | 'Fantasy'
    | 'Sci-Fi'
    | 'Dystopian'
    | 'Adventure'
    | 'Romance'
    | 'Mystery'
    | 'Horror'
    | 'Thriller & Suspense'
    | 'Historical Fiction'
    | 'Contemporary Fiction'
    | 'Literary Fiction'
    | 'Magical Realism'
    | 'Biography'
    | 'Food & Drink'
    | 'History'
    | 'Travel'
    | 'True Crime'
    | 'Science & Technology'
    | 'Business and economics'
    | 'Health and fitness'
    | 'Humor'
    | 'Philosophy'
    | 'Fairytale'
    | 'Satire'
    | 'Western';
  description: string;
  photo?: string;
  photoUrl?: string;
  slug?: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  priceDiscount?: number;
  priceAfterDiscount?: number;
  priceDiscountPercent?: number;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
  reviews?: any[];
}
