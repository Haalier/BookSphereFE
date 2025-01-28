import {User} from './user.model';

export interface Review {
    _id?: string;
    review: string;
    rating: number;
    book: string;
    user: User;
    createdAt?: string;
    updatedAt?: string;
}

export interface MyReview {
    _id?: string;
    review: string;
    rating: number;
    book: {
        id: string;
        title: string;
        author: string;
    };
    user: User;
    createdAt?: string;
    updatedAt?: string;
}
