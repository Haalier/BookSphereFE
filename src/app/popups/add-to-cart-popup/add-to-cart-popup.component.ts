import {
    Component,
    inject,
    input,
    OnInit,
    output,
} from '@angular/core';
import {Book} from '../../models/book.model';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CartService} from '../../services/cart.service';

@Component({
    selector: 'app-add-to-cart-popup',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './add-to-cart-popup.component.html',
    styleUrl: './add-to-cart-popup.component.scss',
})
export class AddToCartPopupComponent implements OnInit {
    cartService = inject(CartService);
    close = output<void>()
    product = input<Book>();
    router = inject(Router)
    totalPrice: number = 0;

    ngOnInit() {
        this.cartService.getCart().subscribe({
            next: result => {
                this.totalPrice = result.data.total;
            }

        })
    }

    closeModal() {
        this.close.emit();
    }

    toCart() {
        this.router.navigate(['/cart']);
    }
}
