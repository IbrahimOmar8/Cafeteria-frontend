import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { Iorder } from 'src/app/interface/iorder';
import { Iprodcut } from 'src/app/interface/iprodcut';
import { Order } from 'src/app/order';
import { Product } from 'src/app/products/interfaces/product';
import { ProductsService } from 'src/app/products/services/products.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  orderList:Iorder[] = []
  startDate:Date =new Date()
  endDate:Date =new Date()
   prevMonth:any = new Date();
   MyOrder :Iorder ={} as Iorder ;
  products: Iprodcut[] = [];
  Orderproducts: Iprodcut[] = [];

  constructor( private productsService: ProductsService,
    private orderServ: OrderService) {
      this.prevMonth.setMonth(this.prevMonth.getMonth()-1);
     }

  ngOnInit(): void {

   // console.log(this.productsService.products)


     this.orderServ.getOrdersByDate(this.startDate, this.endDate).subscribe((data: any) => {
       this.orderList = data;
       console.log(data);
     });

    this.productsService.getProducts().subscribe((data: any) => {
      this.products = data;
      console.log(data);
       this.productsService.onChangeProd(data)
      console.log( "p :  "+this.productsService.products) 

    });

  }

  addProdcut(prod : Product){
    console.log(prod);
    this.Orderproducts.push(prod)
   this.MyOrder.Prodeuct = this.Orderproducts ;
   this.MyOrder.amount += prod.price ;    
  }

   addOrder(){

  //   const observer = {
  //     next: (prd: IProduct) => {
  //       alert("added succesfully")
  //       this.route.navigateByUrl('/products')
        
  //     },
  //     error: (err: Error)=> {alert(err.message)}
  //   }

  //   this.apiservice.addProducts(this.newPrd).subscribe(observer)


}

}

