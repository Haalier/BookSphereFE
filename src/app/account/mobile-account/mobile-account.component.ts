import { Component, inject, input } from '@angular/core';
import { AuthService, userResponseData } from '../../services/auth.service';

@Component({
  selector: 'app-mobile-account',
  standalone: true,
  imports: [],
  templateUrl: './mobile-account.component.html',
  styleUrl: './mobile-account.component.scss',
})
export class MobileAccountComponent {
  authService = inject(AuthService)
  userData = input<userResponseData | null>(null);

  onLogOut() {
    this.authService.logout();
  }
}
