import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { IOrderForAdd } from 'src/app/interface/i-order-for-add';
import { Iorder } from 'src/app/interface/iorder';
import { Iprodcut } from 'src/app/interface/iprodcut';
import { Iuser } from 'src/app/interface/iuser';
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
  user : Iuser = {} as Iuser ;

  orderList:Iorder[] = []
  startDate:Date =new Date()
  endDate:Date =new Date()
  prevMonth:any = new Date();
  MyOrder :Iorder ={} as Iorder ;
  products: Iprodcut[] = [];
  Orderproducts: Iprodcut[] = [];
  objOrderForAdd :IOrderForAdd = {} as IOrderForAdd;

  constructor( private productsService: ProductsService,
    private orderServ: OrderService ,
    private storageService: StorageService,
     private authService: AuthService,
     private route :Router) {
   
     }

  ngOnInit(): void {

    this.productsService.getProducts().subscribe((data: any) => {
      this.products = data;
    });

     this.isLoggedIn = this.storageService.isLoggedIn();

   if (this.isLoggedIn) {
        this.user = this.storageService.getUser();
        this.roles = this.user.roles;
        this.IsAdmin = this.roles.includes('ROLE_ADMIN');
        this.IsUser = this.roles.includes('ROLE_USER');
      }
    //  this.orderServ.getOrdersByDate(this.startDate, this.endDate).subscribe((data: any) => {
    //    this.orderList = data;
    //    console.log(data);
    //  }); 

  }

  addProdcut(prod : Product){
  //  console.log(prod);
    let isFrist = true ;
    this.Orderproducts.forEach(element => {
        if(element._id == prod._id)
        {
          element.size += 1;
          isFrist = false ;
        }
    });

    if(isFrist)
    {
      this.Orderproducts.push(prod)
      this.MyOrder.amount = 0;
    }
   
   this.MyOrder.Prodeuct = this.Orderproducts ;
   //console.log(prod.price);
   //console.log(this.MyOrder.amount);
   
   this.MyOrder.amount += prod.price ;    
  }

  FunRemove( prodID :string )
  {
    this.MyOrder.Prodeuct =  this.MyOrder.Prodeuct.filter((obj)=>
    obj._id !== prodID
    )
    this.Orderproducts = this.MyOrder.Prodeuct
  }
  
  FunMapingObj() :void{

    this.objOrderForAdd.action = this.MyOrder.action ;
    this.objOrderForAdd.amount = this.MyOrder.amount ;
    this.objOrderForAdd.room = this.MyOrder.room ;
    this.objOrderForAdd.status = this.MyOrder.status ;
    this.objOrderForAdd.ext = 1;
    this.objOrderForAdd.user = this.user.id  ;
    
    this.MyOrder.Prodeuct.forEach(element => {
      this.objOrderForAdd.Prodeuct = element._id
    });
    
    }
    

onSubmit():void {  

  if(!this.isLoggedIn)
  {
    alert("your not login")
    this.route.navigateByUrl('/login')  
    return
  }
  this.FunMapingObj() ;



  console.log(this.objOrderForAdd);
  

  const observer = {
    next: (prd: Iorder) => {
      alert("added succesfully")
      this.route.navigateByUrl('/home')      
    },
    error: (err: Error)=> {alert(err.message)}
  }
   this.orderServ.addOrder(this.objOrderForAdd).subscribe(observer)
}


}

