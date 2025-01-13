import {Component, inject, OnInit} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ErrorData, ErrorService} from '../../services/error.service';
import {debounceTime} from 'rxjs';

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
        const savedLogin = window.localStorage.getItem('saved-login');

        if (savedLogin) {
            const loadedLogin = JSON.parse(savedLogin);
            this.loginForm.patchValue({
                email: loadedLogin.email,
            })
        }

        this.errorService.error$.subscribe((err) => {
            this.errMsg = err;
        });

        this.loginForm.valueChanges.pipe(debounceTime(500)).subscribe({
            next: value => {
                window.localStorage.setItem('saved-login', JSON.stringify(value));
            }
        })

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
