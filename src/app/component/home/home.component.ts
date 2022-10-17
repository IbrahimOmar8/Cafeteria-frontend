import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Iorder } from 'src/app/interface/iorder';
import { Iprodcut } from 'src/app/interface/iprodcut';
import { OrderService } from 'src/app/services/order.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  OutPutTestAPI :String = "";
  orderList : Iorder[] =  [];
  producOrdereList : Iprodcut [] = []
  OrderSelct :string ="[0]" ;
  orderDate : Iorder[] =  [];

startDate:Date= new Date();
endDate:Date = new Date()
pipe = new DatePipe('en-US');

  constructor(private userService: UserService,
    private authService:AuthService ,
    private orderService :OrderService) { }

  ngOnInit(): void {
        this.orderService.getAllOrders().subscribe((data: any) => {
          this.orderList = data;
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

  handleSelect(){
    this.orderService.getOrdersByDate(this.startDate, this.endDate).subscribe((data: any) => {
      this.orderDate = data;
      console.log(this.startDate , this.endDate);

      console.log(data);
    }); 
  }

}
