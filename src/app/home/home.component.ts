import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
 books: any;

 private httpClient = inject(HttpClient);
 private destroyRef = inject(DestroyRef);

ngOnInit() {
  const subscription = this.httpClient.get('http://localhost:8080/api/v1/books').subscribe({
    next: (resData) => {
      console.log(resData);
    }
  })

  this.destroyRef.onDestroy(() => {
    subscription.unsubscribe();
  })
}
}
