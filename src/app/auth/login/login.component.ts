import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorService} from '../../services/error.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  authService = inject(AuthService);
  errorService = inject(ErrorService);
  router = inject(Router)
  errMsg : string | null = null;

  ngOnInit() {
    this.errorService.error$.subscribe((err) => {
      this.errMsg = err;
    })
  }

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
}),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(7)]
}),
  });

  onPasswordForgot() {

  }

  loginSubmit() {
    console.log(this.loginForm);
    this.authService.login(this.loginForm.value).subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
