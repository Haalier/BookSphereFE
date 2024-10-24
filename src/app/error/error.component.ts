import {Component, inject, OnInit} from '@angular/core';
import {ErrorService} from '../services/error.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit{
errorService = inject(ErrorService);
errorMessage: string | null = null;

ngOnInit() {
  this.errorService.error$.subscribe((message) => {
    this.errorMessage = message;
  })
}
}
