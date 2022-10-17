import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../services/products.service';
import { Product } from './../interfaces/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {}
}
