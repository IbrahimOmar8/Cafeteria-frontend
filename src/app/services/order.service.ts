import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  httpOption:any;

  constructor(
    private HttpClient : HttpClient
  ) {
    this.httpOption={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      //  ,Authorization: 'my-auth-token'
      })
    }

   }

   getAllOrders(): Observable<Order[]>{
      return this.HttpClient.get<Order[]>(`${environment.BasicURL}orders`);


  }

  getOrderById(orderID: number): Observable<Order>{
    return this.HttpClient.get<Order>(`${environment.BasicURL}orders/${orderID}`);


}

  getOrdersByDate(){

  }

  getOrdersByUserName(){

  }

  addOrder(newOrder:Order) {
    return this.HttpClient.post<Order>(`${environment.BasicURL}orders`, JSON.stringify(newOrder));

  }

  updateOrder() {

  }

  deleteOrder() {

  }
}