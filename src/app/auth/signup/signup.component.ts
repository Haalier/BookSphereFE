import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {ErrorService} from '../../services/error.service';
import {passwordMatchValidator} from '../../utils/validators/password-match-validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
authService = inject(AuthService);
router = inject(Router)
errorService = inject(ErrorService)
  errMsg: string | null = null;

  ngOnInit() {
  this.errorService.error$.subscribe(err => {
    this.errMsg = err;
  })

    this.signupForm.valueChanges.subscribe(() => {
      this.errorService.clearError();
    })
  }

  signupForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    name: new FormControl('', {
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(7)]
    }),
    passwordConfirm: new FormControl('', {
      validators: [Validators.required, Validators.minLength(7)]
    })
  }, {
    validators: [passwordMatchValidator()]
  })

  signupSubmit() {
  console.log(this.signupForm)
    this.authService.signup(this.signupForm.value).subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
