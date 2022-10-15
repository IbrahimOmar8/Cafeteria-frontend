import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // addOrder(){

  //   const observer = {
  //     next: (prd: IProduct) => {
  //       alert("added succesfully")
  //       this.route.navigateByUrl('/products')
        
  //     },
  //     error: (err: Error)=> {alert(err.message)}
  //   }

  //   this.apiservice.addProducts(this.newPrd).subscribe(observer)


//}

}

