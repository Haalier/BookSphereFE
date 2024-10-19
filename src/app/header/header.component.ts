import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {BookService} from '../services/book.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
isLoggedIn = false;
router = inject(Router);
bookService = inject(BookService);


  onHomePage() {
      this.bookService.getBooks(1);
    this.router.navigate(['/books'], {
      queryParams: {page: 1}
    })

  }
}
