import {Component, inject, OnInit} from '@angular/core';
import {ErrorData, ErrorService} from '../services/error.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit{
errorService = inject(ErrorService);
errorMessage: ErrorData;

ngOnInit() {
  this.errorService.error$.subscribe((message) => {
    this.errorMessage = message;
  })
}
}
