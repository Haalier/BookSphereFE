import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {BookService} from '../services/book.service';
import {NgClass} from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
isLoggedIn = false;
isMenuOpen = false;
router = inject(Router);
bookService = inject(BookService);


  onHomePage() {
      this.bookService.getBooks(1);
    this.router.navigate(['/books'], {
      queryParams: {page: 1}
    })

  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
