import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorData, ErrorService } from '../../services/error.service';

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
  activatedRoute = inject(ActivatedRoute);
  errMsg: ErrorData | null = null;
  successMsg: string | null = null;
  resetToken = null;

  ngOnInit() {
    this.errorService.error$.subscribe((err) => {
      this.errMsg = err;
    });
    this.activatedRoute.params.subscribe((params) => {
      console.log('PARAMS', params);
      this.resetToken = params['resetToken'];
      console.log(this.resetToken);
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

  resetSubmit() {
    const data = {
      password: this.resetForm.value.password,
      passwordConfirm: this.resetForm.value.confirmPassword,
    };
    this.authService.resetPassword(data, this.resetToken).subscribe();
  }
}
