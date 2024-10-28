import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {passwordMatchValidator} from '../../utils/validators/password-match-validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  authService = inject(AuthService);
  route = inject(ActivatedRoute);
  router = inject(Router)
  isLogin = true;

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.isLogin = url[0].path === 'login';
      this.updateFormControls();
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

  private updateFormControls(){
    if(!this.isLogin){
      (this.loginForm as FormGroup).addControl('confirmPassword', new FormControl('', Validators.required));
      this.loginForm.setValidators(passwordMatchValidator());
    } else{
      (this.loginForm as FormGroup).removeControl('confirmPassword');
      this.loginForm.setValidators(null);
    }
    this.loginForm.updateValueAndValidity();
  }

  onPasswordForgot() {

  }

  loginSubmit() {
    console.log(this.loginForm);
    this.authService.login(this.loginForm.value).subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.log(err.message);
      }
    })
  }
}
