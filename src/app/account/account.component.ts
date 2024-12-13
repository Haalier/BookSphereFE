import { Component, HostListener, inject, OnInit } from '@angular/core';
import { AuthService, userResponseData } from '../services/auth.service';
import { OrdersComponent } from './orders/orders.component';
import { Router, RouterOutlet } from '@angular/router';
import { DesktopAccountComponent } from './desktop-account/desktop-account.component';
import { MobileAccountComponent } from './mobile-account/mobile-account.component';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    OrdersComponent,
    RouterOutlet,
    DesktopAccountComponent,
    MobileAccountComponent,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  authService = inject(AuthService);
  userData!: userResponseData | null;
  isMobile = false;

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((currentUserData) => {
      this.userData = currentUserData.user;
    });

    if (window.innerWidth <= 950) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
}
