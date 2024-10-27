import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AppLoaderComponent} from './utils/app-loader/app-loader.component';
import {ApiService} from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent, AppLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  apiService = inject(ApiService);
  isLoading: any;

  ngOnInit() {
    this.apiService.loading$.subscribe(loading =>{
      this.isLoading = loading;
    })
  }
}
