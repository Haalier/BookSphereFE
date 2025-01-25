import { Component, ElementRef, input, OnInit, ViewChild} from '@angular/core';
import {CurrencyPipe, DatePipe, SlicePipe, UpperCasePipe} from '@angular/common';
import {Order, OrderItem} from '../../models/order.model';
import {TooltipModule} from 'primeng/tooltip';
import {RouterLink} from '@angular/router';


@Component({
    selector: 'app-order',
    standalone: true,
    imports: [
        CurrencyPipe,
        DatePipe,
        SlicePipe,
        TooltipModule,
        UpperCasePipe,
        RouterLink
    ],
    templateUrl: './order.component.html',
    styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
    @ViewChild('itemContainer') itemContainer: ElementRef;
    order = input<Order>();
    orderItems: OrderItem[] = [];

    ngOnInit() {
        this.order().items.forEach(item => {
            this.orderItems.push(item);
        })


    }

}
