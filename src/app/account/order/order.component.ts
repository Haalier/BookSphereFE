import { AfterViewInit, Component, ElementRef, input, OnInit, ViewChild} from '@angular/core';
import {CurrencyPipe, DatePipe, SlicePipe, UpperCasePipe} from '@angular/common';
import {Order, OrderItem} from '../../models/order.model';
import {TooltipModule} from 'primeng/tooltip';


@Component({
    selector: 'app-order',
    standalone: true,
    imports: [
        CurrencyPipe,
        DatePipe,
        SlicePipe,
        TooltipModule,
        UpperCasePipe
    ],
    templateUrl: './order.component.html',
    styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit, AfterViewInit {
    @ViewChild('itemContainer') itemContainer: ElementRef;
    order = input<Order>();
    orderItems: OrderItem[] = [];
    isOverflowing = false;
    expanded = false;

    ngOnInit() {
        this.order().items.forEach(item => {
            this.orderItems.push(item);
        })
    }

    ngAfterViewInit() {
         console.log('Container: client ', this.itemContainer.nativeElement.clientWidth);
         console.log('Container: scroll ', this.itemContainer.nativeElement.scrollWidth);
         const element = this.itemContainer.nativeElement;
         if(!this.expanded){
             this.isOverflowing = element.scrollWidth > element.clientWidth;
         } else {
             this.isOverflowing = true;
         }
    }
}
