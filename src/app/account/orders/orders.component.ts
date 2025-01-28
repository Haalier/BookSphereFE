import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Order} from '../../models/order.model';
import {OrdersService} from '../../services/orders.service';
import {OrderComponent} from '../order/order.component';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [
        OrderComponent],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
    orders: Order[];
    ordersService = inject(OrdersService)
    destroyRef = inject(DestroyRef)
    ordersResult: number;

    ngOnInit() {
        const subscriptions: Subscription[] = [this.ordersService.getOrders().subscribe(ordersData => {
            this.orders = ordersData.orders;
            this.orders = this.orders.reverse();
        }),
            this.ordersService.orderResults$.subscribe(ordersResult => {
                this.ordersResult = ordersResult;
            })]

        this.destroyRef.onDestroy(() => {
            subscriptions.forEach(subscription => {
                subscription.unsubscribe();
            })
        })
    }
}
