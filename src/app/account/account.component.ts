import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OrdersComponent } from './orders/orders.component';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [OrdersComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  authService = inject(AuthService);
  userName: string | null = null;
  email: string | null = null;
  userId: string | null = null;
  userRole: string | null = null;

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((currentUserData) => {
      this.userName = currentUserData.user.name;
      this.email = currentUserData.user.email;
      this.userId = currentUserData.user.id;
      this.userRole = currentUserData.user.role;
    });
  }

  onLogOut() {
    this.authService.logout();
  }
}
