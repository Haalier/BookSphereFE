import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {BOOK_CATEGORIES} from '../utils/book-categories';

export function bookCategoryValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isValid = BOOK_CATEGORIES.includes(control.value);
        return isValid ? null : {invalidCategory: {value: control.value}}
    }
}