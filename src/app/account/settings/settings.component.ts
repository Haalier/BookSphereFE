import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ErrorService} from '../../services/error.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';

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
    errorService = inject(ErrorService);
    authService = inject(AuthService);
    userData: User | null = null;
    errMsg?: string;

       accountForm: FormGroup = new FormGroup({
        name: new FormControl(this.userData?.name, {
            validators: [Validators.required],
        }),
        email: new FormControl('', {
            validators: [Validators.required, Validators.email],
        }),
    });

    ngOnInit(): void {
        this.errorService.error$.subscribe((error) => {
            this.errMsg = error?.error.message;
        })

        this.authService.user$.subscribe((user) => {
            this.userData = user;
           if(this.userData){
        this.accountForm.patchValue({
            name: this.userData?.name,
            email: this.userData?.email,
        })

        }
        })


    }



    settingsChangeSubmit() {

    }
}
