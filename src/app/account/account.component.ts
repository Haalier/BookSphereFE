import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AuthService, userResponseData} from '../services/auth.service';
import {
    Router,
    RouterOutlet,
    RouterLink,
    RouterLinkActive, ActivatedRoute, NavigationEnd,
} from '@angular/router';
import {filter, map, Subscription} from 'rxjs';

@Component({
    selector: 'app-account',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
    authService = inject(AuthService);
    destroyRef = inject(DestroyRef);
    router = inject(Router);
    userData!: userResponseData | null;
    isContentLoaded = false;

    ngOnInit() {
        const subscriptions: Subscription[] = [this.authService.getCurrentUser().subscribe((currentUserData) => {
            this.userData = currentUserData.user;
        }),
            this.router.events.pipe(filter(event => event instanceof NavigationEnd),
                map((event: NavigationEnd) => event.urlAfterRedirects !== '/account')).subscribe(event => {
                this.isContentLoaded = event
            })
        ]

        this.destroyRef.onDestroy(() => {
            subscriptions.forEach(subscription => subscription.unsubscribe());
        })

    }

    onSettings() {
        this.router.navigate(['/settings']);
    }

    onReviews() {
        this.router.navigate(['/reviews']);
    }

    onReturns() {
        this.router.navigate(['/returns']);
    }

    onLogOut() {
        this.authService.logout();
    }
}
