import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorData, ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  errorService = inject(ErrorService);
  router = inject(Router);
  errMsg: ErrorData | null = null;

  ngOnInit() {
    this.errorService.error$.subscribe((err) => {
      this.errMsg = err;
    });
  }

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(7)],
    }),
  });

  onPasswordForgot() {
    this.router.navigate(['/forgot-password']);
  }

  loginSubmit() {
    this.authService.login(this.loginForm.value).subscribe({});
  }
}
