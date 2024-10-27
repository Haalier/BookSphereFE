import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {BooksService} from '../services/books.service';
import {NgClass} from '@angular/common';
import {AuthService} from '../services/auth.service';


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
export class HeaderComponent implements OnInit {
authService = inject(AuthService);
booksService = inject(BooksService);
router = inject(Router);
role: 'user' | 'admin' | undefined;
isLoggedIn = false;
isMenuOpen = false;


ngOnInit() {
 this.authService.user$.subscribe(user => {
   this.isLoggedIn = !!user;
   this.role = user?.role;
 })
}

  onHomePage() {
    this.booksService.getBooks(1);
    this.router.navigate(['/books'], {
      queryParams: {page: 1}
    })
    this.isMenuOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogOut() {
    this.authService.logout();
  }

  onLoginPage() {
    this.router.navigate(['/login']);
    this.isMenuOpen = false;
  }
}
