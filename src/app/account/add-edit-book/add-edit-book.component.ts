import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BOOK_CATEGORIES} from '../../utils/book-categories';
import {bookCategoryValidator} from '../../validators/book-category.validator';

@Component({
  selector: 'app-add-edit-book',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-edit-book.component.html',
  styleUrl: './add-edit-book.component.scss'
})
export class AddEditBookComponent {
  bookEditForm = new FormGroup({
    file: new FormControl(''),
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)]
    }),
    author: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)]
    }),
    desc: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10)]
    }),
    category: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4), bookCategoryValidator()]
    }),
    pages: new FormControl('', {
      validators: [Validators.required, Validators.min(0)]
    }),
    price: new FormControl('', {
      validators: [Validators.required, Validators.min(0)]
    }),
    stock: new FormControl('', {
      validators: [Validators.required, Validators.min(0)]
    })

  })

  onBookUpload() {

  }
}
