import { Component, OnChanges, OnInit } from '@angular/core';
import { Order } from 'src/app/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit , OnChanges {

  orderList: Order[] =[];

cardContent:object={
  title:"coffee",
  price: 50,
  details: "bla bla bla"

} 
 
 
  constructor(
    private orderServ : OrderService
  ) { }

  ngOnInit(): void {
    this.orderServ.getAllOrders().subscribe(
      orders => {
        this.orderList = orders
      }
    )

    console.log(this.orderList)
  }

  ngOnChanges(){
 
  }

}