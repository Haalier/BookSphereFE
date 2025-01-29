import {
    Component,
    ElementRef,
    inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import {CartItems, CartService} from '../services/cart.service';
import {CurrencyPipe} from '@angular/common';
import {finalize} from 'rxjs';
import {OrdersService} from '../services/orders.service';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CurrencyPipe],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
    cartService = inject(CartService);
    ordersService = inject(OrdersService);
    authService = inject(AuthService);
    cartItems: CartItems[] = [];
    totalPrice = 0;
    user$: any;

    ngOnInit() {
        this.loadCart();
        this.authService.user$.subscribe(user => {
            this.user$ = user;
        })
    }

    loadCart() {
        this.cartService.getCart().subscribe((data) => {
            this.cartItems = data.data.items;
            this.totalPrice = data.data.total;
        });
    }

    updateQuantity(item: any, isIncrease: boolean) {
        const bookId = item.book.id;
        let itemQuantity = item.quantity;
        const updatedQuantity = isIncrease ? ++itemQuantity : --itemQuantity;
        console.log(updatedQuantity);

        if (updatedQuantity <= 0) {
            if (confirm('Are you sure you want to delete this book-info?')) {
                return this.deleteFromCart(bookId);
            }
            return;
        }

        this.cartService
            .updateCartItems(bookId, {quantity: updatedQuantity})
            .subscribe((res) => {
                this.loadCart();
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

    onCheckout() {
        this.ordersService.checkout().subscribe(() => {
            this.loadCart();
        });
    }
}
