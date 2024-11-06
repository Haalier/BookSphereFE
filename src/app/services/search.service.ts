import {inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {Book} from '../models/book.model';
import {finalize} from 'rxjs';

interface SearchResponse {
data: Book[];
results: number
status: string
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
apiService = inject(ApiService)
private apiUrl = 'http://localhost:8080/api/v1/search';
private http = inject(HttpClient);

constructor() { }

searchFor(query: string){
    this.apiService.loadingSubject.next(true);
    return this.http.get<SearchResponse>(`${this.apiUrl}?q=${query}`).pipe(finalize(() => {
      this.apiService.loadingSubject.next(false);
    }))
}
}
