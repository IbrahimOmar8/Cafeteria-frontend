import { Component, OnInit } from '@angular/core';
import { Iorder } from 'src/app/interface/iorder';
import { Iprodcut } from 'src/app/interface/iprodcut';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  // content?: string;
  

  orderList : Iorder[] =  [];

  producOrdereList : Iprodcut [] = []

   OrderSelct :string ="[0]" ;


  constructor(private userService: UserService,
              private orderService : OrderService) { }

  ngOnInit(): void {
  //   this.userService.getAdminBoard().subscribe({
  //     next: data => {
  //       this.content = data;
  //     },
  //     error: err => {console.log(err)
  //       if (err.error) {
  //         this.content = JSON.parse(err.error).message;
  //       } else {
  //         this.content = "Error with status: " + err.status;
  //       }
  //     }
  //   });


  this.orderService.getAllOrders().subscribe((data: any) => {
    this.orderList = data;
  //console.log( this.orderList);
  this.producOrdereList =  this.orderList[0].Prodeuct;
    
  });


   }

   ShowProduct(orderID :string){
    this.OrderSelct = orderID ;     
    const orderSelct = this.orderList.filter( (obj) =>
    obj._id == orderID
    )

      console.log(orderSelct);
      
    
    this.producOrdereList = orderSelct[0].Prodeuct

    //console.log(this.producOrdereList);

   }

}
