import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('itemQuantity') quantity!: ElementRef;

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

  updateQuantity(item: any, isIncrease: boolean) {
    const bookId = item.book.id;
    let itemQuantity = +this.quantity.nativeElement.textContent;

    const updatedQuantity = isIncrease ? ++itemQuantity : --itemQuantity;

    if (updatedQuantity <= 0) {
      if (confirm('Are you sure you want to delete this book?')) {
        return this.deleteFromCart(bookId);
      }
    }

    this.cartService
      .updateCartItems(bookId, { quantity: updatedQuantity })
      .subscribe((res) => {
        const newQuantity = res.item.quantity;
        this.quantity.nativeElement.textContent = newQuantity;

        const priceChange = res.item.book.price * (isIncrease ? 1 : -1);
        this.totalPrice += priceChange;
      });
  }

  decreaseQuantity(item: any) {
    this.updateQuantity(item, false);
  }

  increaseQuantity(item: any) {
    this.updateQuantity(item, true);
  }

  deleteFromCart(_id: string) {
    this.cartService
      .removeFromCart(_id)
      .pipe(finalize(() => this.loadCart()))
      .subscribe();
  }

  protected readonly Object = Object;
}
