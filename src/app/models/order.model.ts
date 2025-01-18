export interface OrderItem {
book?: string;
quantity?: number;
title?: string;
author?: string;
photoUrl?: string;
price?: number;
_id?: string;
}

export interface Order {
    _id?: string;
    user?: string
    items?: OrderItem[]
    total?: number;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface GetOrders{
    status?: string;
    results?: number;
    user?: string;
    orders?: Order[];
}

export interface Checkout{
    status?: string;
    data?: {
        user?: string;
        items?: OrderItem[];
        total?: number;
        status?: string;
        id?: string;
        createdAt?: string;
        updatedAt?: string;
    };
}