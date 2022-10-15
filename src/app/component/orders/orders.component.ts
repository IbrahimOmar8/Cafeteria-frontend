import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnChanges {


  orderList: Order[] =[];


  
  newOrd:any = {
    _id:'',
    user: '',
    date:new Date(),
    status:'',
    amount:0,
    action:'',    
      room:0,
    ext:0
         
  };


  editMode: boolean =false;
  currentOrderId: string =''
@ViewChild('orderForm') form: any




  constructor(
    private orderServ: OrderService,
    private router : Router
    ) { 
     }

  ngOnInit(): void {
    this.orderServ.getAllOrders().subscribe((data: any) => {
      this.orderList = data;
      console.log(data);
    });
  // }



   


  }

  ngOnChanges() {
  }


  addnewOrder() {
    this.orderServ.addOrder(this.newOrd).subscribe((data: any) => {
      this.orderList.push(data)
      console.log(data);
      console.log(this.newOrd)
    }) 
console.log(this.newOrd)
  }
  

  onDelete(id:string, order: any){
    const observer = {
      next: () => {
        console.log('removed succesfully');
        this.orderServ.getAllOrders().subscribe((data: any) => {
          this.orderList = data;
        });
      },
      error: (err: Error) => alert(err.message),
    };
    this.orderServ.deleteOrder(id).subscribe(observer);
  }




  onEdite( id:string ){
  }

  onDone(action:string){
      this.orderServ.updateOrder(this.currentOrderId , action)
  }

}