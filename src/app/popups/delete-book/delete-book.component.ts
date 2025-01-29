import {Component, inject, input, output} from '@angular/core';
import {EventService} from '../../services/event.service';
import {BooksService} from '../../services/books.service';

@Component({
    selector: 'app-delete-book',
    standalone: true,
    imports: [],
    templateUrl: './delete-book.component.html',
    styleUrl: './delete-book.component.scss'
})
export class DeleteBookComponent {
    booksService = inject(BooksService);
    eventService = inject(EventService);
    close = output<void>()
    delete = output<void>();
    bookId = input<string>();

    closeModal() {
        this.close.emit();
    }

    deleteBook() {
        this.booksService.deleteBook(this.bookId()).subscribe(() => {
            this.close.emit();
            this.delete.emit()
            this.eventService.emitRefreshBooks();
        });
    }
}
