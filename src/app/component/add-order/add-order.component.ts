import { Component, OnInit } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { Iorder } from 'src/app/interface/iorder';
import { Iprodcut } from 'src/app/interface/iprodcut';
import { Order } from 'src/app/order';
import { Product } from 'src/app/products/interfaces/product';
import { ProductsService } from 'src/app/products/services/products.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  IsAdmin = false;
  IsUser = false;
  UserID?: string;

  orderList:Iorder[] = []
  startDate:Date =new Date()
  endDate:Date =new Date()
  prevMonth:any = new Date();
  MyOrder :Iorder ={} as Iorder ;
  products: Iprodcut[] = [];
  Orderproducts: Iprodcut[] = [];

  constructor( private productsService: ProductsService,
    private orderServ: OrderService ,
    private storageService: StorageService,
     private authService: AuthService,
     private route :Router) {
   
     }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

   if (this.isLoggedIn) {
        const user = this.storageService.getUser();
        this.roles = user.roles;

        this.IsAdmin = this.roles.includes('ROLE_ADMIN');
        this.IsUser = this.roles.includes('ROLE_USER');

        this.UserID = `${user._id}` ;
      }


    //  this.orderServ.getOrdersByDate(this.startDate, this.endDate).subscribe((data: any) => {
    //    this.orderList = data;
    //    console.log(data);
    //  });

    this.productsService.getProducts().subscribe((data: any) => {
      this.products = data;
      console.log(data);
       this.productsService.onChangeProd(data)
      console.log( "p :  "+this.productsService.products) 

    });

  }

  addProdcut(prod : Product){
    console.log(prod);
    let isFrist = true ;
    this.Orderproducts.forEach(element => {
        if(element._id == prod._id)
        {
          element.price += prod.price
          isFrist = false ;
        }
    });

    if(isFrist)
    {
      this.Orderproducts.push(prod)
    }
   
   this.MyOrder.Prodeuct = this.Orderproducts ;
   this.MyOrder.amount += prod.price ;    
  }

  FunRemove( prodID :string )
  {
    this.MyOrder.Prodeuct =  this.MyOrder.Prodeuct.filter((obj)=>
    obj._id !== prodID
    )
    this.Orderproducts = this.MyOrder.Prodeuct
  }

addOrder(){
 console.log(this.MyOrder)
  const observer = {
    next: (prd: Iorder) => {
      alert("added succesfully")
      this.route.navigateByUrl('/home')
      
    },
    error: (err: Error)=> {alert(err.message)}
  }

  this.orderServ.addOrder(this.MyOrder).subscribe(observer)


}

}

