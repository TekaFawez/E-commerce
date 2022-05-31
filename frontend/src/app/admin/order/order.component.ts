import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { OrdersService } from './../../shared/services/orders.service';
import { Order } from './../../shared/models/order';
import { Component, OnInit } from '@angular/core';
import { ORDER_STATUS } from './order.constants';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
orders:Order []=[]
orderStatus :any = ORDER_STATUS ;

  constructor(private ordersService : OrdersService,
    private router : Router,
    private messageService:MessageService
    ) { }

  ngOnInit(): void {
    this._getOrders();
  }
  private _getOrders(){
    this.ordersService.getOrders().subscribe((orders)=>{
      this.orders=orders;
    })
   }
   showOrder(orderId:string){
     this.router.navigateByUrl(`admin/orders/${orderId}`)

   }
   deleteOrder(orderId:string){
    this.ordersService.deleteOrder(orderId).subscribe(
      (response) =>{
        this._getOrders();

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'order is deleted!'
      });
    },
    (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'order is not deleted!'
      });
    }
    )
  

   }

}
