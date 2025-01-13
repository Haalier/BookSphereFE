import { Component, inject, OnInit } from '@angular/core';
import { AuthService, userResponseData } from '../services/auth.service';
import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  authService = inject(AuthService);
  userData!: userResponseData | null;
  router = inject(Router);

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((currentUserData) => {
      this.userData = currentUserData.user;
    });
  }

  onSettings() {
    this.router.navigate(['/settings']);
  }

  onReviews() {
    this.router.navigate(['/reviews']);
  }
  onReturns() {
    this.router.navigate(['/returns']);
  }

  onLogOut() {
    this.authService.logout();
  }
}
