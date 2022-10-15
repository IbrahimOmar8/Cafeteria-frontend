import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnChanges {

  orderList: Order[] =[];
  cardContent: any
  myList: any;
  editMode: boolean =false;
  currentOrderId: string =''
@ViewChild('orderForm') form: any
  constructor(private orderServ: OrderService) {
this.myList =[]
    this.cardContent = {
      date: '',
      user: '',
      room: 0,
      ext: 0,
      action: ''
    }

   
  }

  ngOnInit(): void {


    this.orderServ.getAllOrders().subscribe(
    {next:  orders => {
        this.orderList = orders
        console.log("order: " + orders)
        // console.log("next: " + next)
      }

      }
      )



    //  if(this.orderList) {
    // this.ordersList= this.orderList.map((item:any) => {
    //     console.log('item: '+ item)
    //    return this.cardContent= {
    //     date: item.date,
    //     user: item.user.username,
    //     room: item.room,
    //     ext: item.ext,
    //     action: item.action
    //    }
    //   })
    // }


  }

  ngOnChanges() {
      // this.orderServ.updateOrder().subscribe(

      // )

      
    if(this.orderList) {
      this.orderList.map((item:any)=> {
        this.myList.push(item)
  
            })
            console.log(this.myList)
          }

  }
  onDelete(id:string){
this.orderServ.deleteOrder(id)
  }

  onEdite(id:string){

    console.log(this.orderList)
    // this.currentOrderId = id
//     let thisOrder = this.orderList.find((order:any) =>{
//       return order.id === id
//     })
// console.log(thisOrder)

// this.form.setValue({
//   action: thisOrder.action
// })

// this.editMode= true
  }

  onDone(action:string){
      this.orderServ.updateOrder(this.currentOrderId , action)
  }

}