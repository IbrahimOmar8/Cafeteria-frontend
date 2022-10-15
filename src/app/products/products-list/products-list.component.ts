import { ProductsService } from './../services/products.service';
import { Product } from './../interfaces/product';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data: any) => {
      this.products = data;
      console.log(data);
       this.productsService.onChangeProd(data)
      console.log( "p :  "+this.productsService.products) 

    });
 }
  onDelete(id: number, product: any) {
    const observer = {
      next: () => {
        console.log('removed succesfully');
        this.productsService.getProducts().subscribe((data: any) => {
          this.products = data;
        });
      },
      error: (err: Error) => alert(err.message),
    };
    this.productsService.removeProduct(id).subscribe(observer);
  }
  onEdit(id: number) {
    this.router.navigate(['products/edit', id]);
  }
}
