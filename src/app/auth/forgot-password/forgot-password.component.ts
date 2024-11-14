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
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnInit {
  authService = inject(AuthService);
  errorService = inject(ErrorService);
  router = inject(Router);
  errMsg: ErrorData | null = null;
  successMsg: string | null = null;

  ngOnInit() {
    this.errorService.error$.subscribe((err) => {
      this.errMsg = err;
    });
  }

  forgotForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
  });

  onLogIn() {
    this.router.navigate(['/login']);
  }

  forgotSubmit() {
    console.log(this.forgotForm.value.email);
    this.authService
      .forgotPassword({ email: this.forgotForm.value.email })
      .subscribe({
        next: (res) => {
          this.successMsg = res.message;
        },
      });
  }
}
