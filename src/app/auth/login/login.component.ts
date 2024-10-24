import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(7)])
  })



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
