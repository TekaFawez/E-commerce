import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  


  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:3000/api/v1/orders');
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${'http://localhost:3000/api/v1/orders'}/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('http://localhost:3000/api/v1/orders', order);
  }

  updateOrder(orderStaus: { status: string }, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${'http://localhost:3000/api/v1/orders'}/${orderId}`, orderStaus);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${'http://localhost:3000/api/v1/orders'}/${orderId}`);
  }
}