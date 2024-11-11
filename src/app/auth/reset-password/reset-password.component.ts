import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  authService = inject(AuthService);
  errorService = inject(ErrorService);
  router = inject(Router);
  errMsg: string | null = null;
  successMsg: string | null = null;

  ngOnInit() {
    this.errorService.error$.subscribe((err) => {
      this.errMsg = err;
    });
  }

  resetForm = new FormGroup({
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(7)],
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(7)],
    }),
  });

  onLogIn() {
    this.router.navigate(['/login']);
  }

  resetSubmit() {
    console.log(this.resetForm);
  }
}
