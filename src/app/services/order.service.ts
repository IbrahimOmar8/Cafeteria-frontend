import { HttpClient, HttpHeaders , HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
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


   private handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.error('an error ocuured: ', error.error)

    }else{
      console.error(`Backend returned code ${error.status}, body was: `, error.error)
    }
    return throwError(
      ()=> new Error('error occured, please try again. ')
    )
  }

   getAllOrders(): Observable<Order[]>{
      return this.HttpClient.get<Order[]>(`${environment.BasicURL}order`)
      .pipe(
        retry(2),
        catchError(this.handleError)
        )

  }






  getOrderById(orderID: number): Observable<Order>{
    return this.HttpClient.get<Order>(`${environment.BasicURL}orders/${orderID}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
      )


}


  getOrdersByDate(){

  }

  getOrdersByUserName(){

  }

  addOrder(newOrder:Order) : Observable<Order>{
    return this.HttpClient.post<Order>(`${environment.BasicURL}orders`,
     JSON.stringify(newOrder))
    .pipe(
      retry(2),
      catchError(this.handleError)
      )

  }

  // updateOrder(id: string,newOrder:Order) : Observable<Order>{
    updateOrder(id: string,newOrder:any) : Observable<Order>{
    return this.HttpClient.put<Order>(`${environment.BasicURL}orders/`+id,
     JSON.stringify(newOrder))
    .pipe(
      retry(2),
      catchError(this.handleError)
      )
  }

  deleteOrder(id:any) {

  }
}