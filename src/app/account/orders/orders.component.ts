import {Component, inject, OnInit} from '@angular/core';
import {Order} from '../../models/order.model';
import {OrdersService} from '../../services/orders.service';
import {OrderComponent} from '../order/order.component';
import {ReversePipe} from '../../pipes/reverse.pipe';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [
        OrderComponent,
        ReversePipe
    ],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
    orders: Order[];
    ordersService = inject(OrdersService)
    ordersResult: number;

    ngOnInit() {
        this.ordersService.getOrders().subscribe(ordersData => {
            console.log(ordersData);
            this.orders = ordersData.orders;
        })
        this.ordersService.orderResults$.subscribe(ordersResult => {
            this.ordersResult = ordersResult;
        })
    }
}
