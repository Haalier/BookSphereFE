import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';

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
// TODO
  onHomePage() {
    this.router.navigate(['/books'], {
      queryParams: {page: 1}
    }).then(() => {
      window.location.reload()
    });
  }
}
