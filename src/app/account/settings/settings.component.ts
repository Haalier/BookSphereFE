import {Component, inject, OnInit, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ErrorService} from '../../services/error.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';
import {EventService} from '../../services/event.service';

// interface UserData {
//     status: string;
//     user: User;
// }

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
    eventService = inject(EventService);
    errorService = inject(ErrorService);
    authService = inject(AuthService);
    router = inject(Router);
    userData: User | null = null;
    errMsg?: string;

    accountForm: FormGroup = new FormGroup({
        name: new FormControl(this.userData?.name),
        email: new FormControl('', {
            validators: [Validators.email],
        }),
        password: new FormControl('', {
            validators: [Validators.minLength(7)]
        }),
    });

    ngOnInit(): void {
        this.errorService.error$.subscribe((error) => {
            this.errMsg = error?.error.message;
        })

        this.authService.user$.subscribe((user) => {
            this.userData = user;
            if (this.userData) {
                this.accountForm.patchValue({
                    name: this.userData?.name,
                    email: this.userData?.email,
                })

            }
        })


    }

    settingsChangeSubmit() {
        let dataToChange: {
            name?: string,
            email?: string,
            password?: string
        } = {}

        for (let [key, value] of Object.entries(this.accountForm.value)) {
            if (value) {
                if (typeof value === "string") {
                    dataToChange[key as keyof typeof dataToChange] = value;
                }
            }
        }


        this.authService.updateCurrentUser(dataToChange).subscribe((res) => {
            this.eventService.emitEvent();
            this.router.navigate(['/account']);
        });

    }
}
