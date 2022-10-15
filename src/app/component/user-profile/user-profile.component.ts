import { Component, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { Order } from 'src/app/order';
import { ProductsService } from 'src/app/products/services/products.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit , OnChanges{
  orderList:Order[] =[]
  startDate:Date =new Date()
  endDate:Date =new Date()
   prevMonth:any = new Date();

  constructor(
    private productsService: ProductsService,
    private orderServ: OrderService
  ) { 
    this.prevMonth.setMonth(this.prevMonth.getMonth()-1);

  }

  ngOnInit(): void {
    console.log(this.productsService.products)


    this.orderServ.getOrdersByDate(this.startDate, this.endDate).subscribe((data: any) => {
      this.orderList = data;
      console.log(data);
    });


  }
  ngOnChanges(changes: SimpleChanges): void {

  }

}
