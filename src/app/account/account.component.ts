import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AuthService, userResponseData} from '../services/auth.service';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute, NavigationStart} from '@angular/router';
import {filter, map, Subscription} from 'rxjs';
import {OrdersService} from '../services/orders.service';
import {GetOrders, Order, OrderItem} from '../models/order.model';
import {OrderComponent} from './order/order.component';
import {EventService} from '../services/event.service';


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
        const subscriptions: Subscription[] = [this.getUserData(),
            this.router.events.pipe(filter(event => event instanceof NavigationStart || event instanceof NavigationEnd),
                map((event: NavigationStart | NavigationEnd) =>{
                  if(event instanceof NavigationEnd){
                      return event.url !== '/account';
                  }
                  return true
                } )).subscribe(isLoaded => {
                this.isContentLoaded = isLoaded;
            }),

            this.eventService.refreshUserData$.subscribe((event) => {
                this.getUserData();
            }),

            this.orderService.getOrders().subscribe((ordersData: GetOrders) => {
                this.ordersData = ordersData;
                this.orders = this.ordersData.orders;
                this.orderItems = this.ordersData.orders?.flatMap((order) => order.items || []);
                this.lastTwoOrders = ordersData.orders?.slice(-2);
                this.lastTwoOrders = this.lastTwoOrders.reverse();

            })
        ]
        const currentUrl = this.router.url;
        this.isContentLoaded = currentUrl !== '/account';

        this.destroyRef.onDestroy(() => {
            subscriptions.forEach(subscription => subscription.unsubscribe());
        })

    }

    getUserData() {
        return this.authService.getCurrentUser().subscribe((currentUserData) => {
            this.userData = currentUserData.user;
        })
    }

    onSettings() {
        this.router.navigate(['settings'], {relativeTo: this.ActivatedRoute});
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

    onOrders() {
        this.router.navigate(['orders'], {relativeTo: this.ActivatedRoute});
    }
}
