import { Component, inject, input } from '@angular/core';
import { AuthService, userResponseData } from '../../services/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-desktop-account',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './desktop-account.component.html',
  styleUrl: './desktop-account.component.scss',
})
export class DesktopAccountComponent {
  authService = inject(AuthService);
  userData = input<userResponseData | null>(null);

  onLogOut() {
    this.authService.logout();
  }
}
