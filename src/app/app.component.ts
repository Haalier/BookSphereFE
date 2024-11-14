import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppLoaderComponent } from './utils/app-loader/app-loader.component';
import { ApiService } from './services/api.service';
import { ErrorService } from './services/error.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AppLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  apiService = inject(ApiService);
  errorService = inject(ErrorService);
  isLoading = false;
  router = inject(Router);

  ngOnInit() {
    this.apiService.loading$.subscribe((loading) => {
      this.isLoading = loading;
      this.cdr.detectChanges();
    });
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        this.errorService.clearError();
      }
    });
  }
}
