import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {BookComponent} from '../../book/book.component';
import {BooksService} from '../../services/books.service';
import {Book} from '../../models/book.model';
import {AddToCartPopupComponent} from '../../popups/add-to-cart-popup/add-to-cart-popup.component';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {DeleteBookComponent} from '../../popups/delete-book/delete-book.component';

@Component({
    selector: 'app-manage-books',
    standalone: true,
    imports: [
        BookComponent,
        AddToCartPopupComponent,
        DeleteBookComponent
    ],
    templateUrl: './manage-books.component.html',
    styleUrl: './manage-books.component.scss'
})
export class ManageBooksComponent implements OnInit {
    authService = inject(AuthService);
    bookService = inject(BooksService);
    destroyRef = inject(DestroyRef);
    books: Book[];
    booksResults: number;
    user: User | null;
    page = 1;
    limit = 20;
    showModal = false;
    showDeleteModal = false;
    bookToDelete: string | null = null;
    book: Book;

    ngOnInit() {
        this.bookService.limit = this.limit;
        this.bookService.getBooks(this.page);
        this.bookService.bookList$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
            this.books = data;
        })

        this.bookService.bookResults$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
            this.booksResults = data;
        })

        this.authService.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(user => {
            this.user = user;
        })
    }

    onCloseModal(event: void) {
        this.showModal = false;
        document.body.style.overflow = 'auto';
    }

    onBookDelete(bookId: string) {
        this.showDeleteModal = true;
        this.bookToDelete = bookId;
        document.body.style.overflow = 'hidden';
    }

    onDeleteModalClose(event: void) {
        this.showDeleteModal = false;
        document.body.style.overflow = 'auto';
    }

    loadMore() {
        this.limit += 20;
        this.bookService.limit = this.limit;
        this.bookService.getBooks(this.page);
    }

    goBack() {
        window.scrollTo({
            top: 0,
        });
    }
}
