import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserByAdmin} from '../../models/user.model';
import {UserComponent} from './user/user.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [
        UserComponent
    ],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
    authService = inject(AuthService);
    destroyRef = inject(DestroyRef)
    users: UserByAdmin[];
    results: number = 0;

    ngOnInit() {
        this.authService.getAllUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
            console.log(data);
            this.results = data.results;
            this.users = data.users;
        })
    }
}
