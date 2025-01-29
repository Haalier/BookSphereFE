import {Component, DestroyRef, inject, OnInit, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ErrorService} from '../../services/error.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';
import {EventService} from '../../services/event.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
    destroyRef = inject(DestroyRef);
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
        this.errorService.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((error) => {
            this.errMsg = error?.error.message;
        })

        this.authService.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
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


        this.authService.updateCurrentUser(dataToChange).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res) => {
            this.eventService.emitRefreshEvent();
            this.router.navigate(['/account']);
        });

    }
}
