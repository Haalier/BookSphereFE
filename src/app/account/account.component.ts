import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AuthService, userResponseData} from '../services/auth.service';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute, NavigationStart} from '@angular/router';
import {filter, map, Subscription, take} from 'rxjs';
import {OrdersService} from '../services/orders.service';
import {GetOrders, Order, OrderItem} from '../models/order.model';
import {OrderComponent} from './order/order.component';
import {EventService} from '../services/event.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';


@Component({
    selector: 'app-account',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, OrderComponent],
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
    eventService = inject(EventService);
    ActivatedRoute = inject(ActivatedRoute);
    authService = inject(AuthService);
    orderService = inject(OrdersService)
    destroyRef = inject(DestroyRef);
    router = inject(Router);
    userData!: userResponseData | null;
    isContentLoaded = false;
    ordersData?: GetOrders;
    orders?: Order[];
    orderItems?: OrderItem[];
    lastTwoOrders?: Order[];

    ngOnInit() {
        this.getUserData()
        this.router.events.pipe(filter(event => event instanceof NavigationStart || event instanceof NavigationEnd),
            map((event: NavigationStart | NavigationEnd) => {
                if (event instanceof NavigationEnd) {
                    return event.url !== '/account';
                }
                return true
            })).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(isLoaded => {
            this.isContentLoaded = isLoaded;
        })

        this.eventService.refreshUserData$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
            this.getUserData();
        })

        this.orderService.getOrders().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((ordersData: GetOrders) => {
            this.ordersData = ordersData;
            this.orders = this.ordersData.orders;
            this.orderItems = this.ordersData.orders?.flatMap((order) => order.items || []);
            this.lastTwoOrders = ordersData.orders?.slice(-2);
            this.lastTwoOrders = this.lastTwoOrders.reverse();

        })
        const currentUrl = this.router.url;
        this.isContentLoaded = currentUrl !== '/account';


    }

    getUserData() {
        return this.authService.getCurrentUser().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((currentUserData) => {
            this.userData = currentUserData.user;
        })
    }

    onSettings() {
        this.router.navigate(['settings'], {relativeTo: this.ActivatedRoute});
    }

    onReviews() {
        this.router.navigate(['reviews'], {relativeTo: this.ActivatedRoute});
    }

    onReturns() {
        this.router.navigate(['returns']);
    }

    onLogOut() {
        this.authService.logout();
    }

    onOrders() {
        this.router.navigate(['orders'], {relativeTo: this.ActivatedRoute});
    }

    onManageBooks() {
        this.router.navigate(['books'], {relativeTo: this.ActivatedRoute});
    }

    onManageUsers() {
        this.router.navigate(['users'], {relativeTo: this.ActivatedRoute});
    }
}
