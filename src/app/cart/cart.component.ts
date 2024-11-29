import { Component, inject, OnInit } from '@angular/core';
import { CartItems, CartService } from '../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  cartItems: CartItems[] = [];
  totalPrice = 0;
  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe((data) => {
      this.cartItems = data.data.items;
      this.totalPrice = data.data.total;
    });
  }

  decreaseQuantity(item: CartItems) {}

  increaseQuantity(item: CartItems) {}

  deleteFromCart(_id: string) {
    this.cartService
      .removeFromCart(_id)
      .pipe(finalize(() => this.loadCart()))
      .subscribe();
  }

  protected readonly Object = Object;
}
