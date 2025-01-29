import {Component, inject, input, output} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {StarRatingComponent} from '../utils/star-rating/star-rating.component';
import {Book} from '../models/book.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../services/cart.service';
import {BooksService} from '../services/books.service';
import {User} from '../models/user.model';

@Component({
    selector: 'app-book',
    standalone: true,
    imports: [
        CurrencyPipe,
        StarRatingComponent
    ],
    templateUrl: './book.component.html',
    styleUrl: './book.component.scss'
})
export class BookComponent{
    book = input<Book>()
    user = input<User>();
    deleteBook = output<string>();
    bookToCart = output<Book>()
    showModal = output<void>();
    activatedRoute = inject(ActivatedRoute);
    booksService = inject(BooksService);
    cartService = inject(CartService);
    router = inject(Router);
    isEditing = false;

    scrollToTop() {
        window.scrollTo({
            top: 0,
        });
    }



    onBook(_id: string, slug: string) {
        this.router.navigate(['/books', _id, slug], {
            relativeTo: this.activatedRoute,
        });
        this.scrollToTop();
    }


    onAddToCart(_id: string, slug: string, event: MouseEvent) {
        event.stopPropagation();
        const data = {
            bookId: this.book()._id,
            quantity: 1,
        };

        this.showModal.emit();

        this.cartService.addToCart(data).subscribe(() => {
            document.body.style.overflow = 'hidden';

        });

        this.booksService.getBook(this.book()._id, slug).subscribe((book) => {
            this.bookToCart.emit(book.data.book)
        })
    }

    onBookEdit(_id: string, event: MouseEvent) {
        event.stopPropagation();
        this.isEditing = true;
        if(this.isEditing){
            this.router.navigate(['/account/edit'], {queryParams: {id: _id}});
        }
    }

    onBookDelete(_id: string, event: MouseEvent) {
        event.stopPropagation();
        this.deleteBook.emit(_id);
    }
}
