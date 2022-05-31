import { MessageService } from 'primeng/api';
import { OrdersService } from './../../shared/services/orders.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ORDER_STATUS } from '../order/order.constants';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: any;
  orderStatuses :any[] = [];
  selectedStatus: any;
  constructor(private ordersService:OrdersService,
    private route: ActivatedRoute,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
   
   
  }
  private _mapOrderStatus() {

    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      };
    });
  }
  private _getOrder(){
    this.route.params.subscribe(params=>{
      if(params['id']) {
        this.ordersService.getOrder(params['id']).subscribe(order=>{
          this.order=order;
        })

      }
    })
  }
  onStatusChange(event :any) {
    console.log(event)
    this.ordersService.updateOrder({ status: event['value'] }, this.order.id).subscribe(
      (order ) => {
       
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order is updated!'
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Order is not updated!'
        });
      }
    );
  }
  
 

}
