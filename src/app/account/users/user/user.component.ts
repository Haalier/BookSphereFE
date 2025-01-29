import {Component, input, OnInit} from '@angular/core';
import {UserByAdmin} from '../../../models/user.model';
import {NgClass} from '@angular/common';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
    user = input<UserByAdmin>();
    isActive: boolean = false;

    ngOnInit(): void {
        this.isActive = this.user().active;
    }
}
