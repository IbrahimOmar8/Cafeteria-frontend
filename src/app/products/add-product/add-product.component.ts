import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  categories: any;
  constructor(
    public fb: FormBuilder,
    private productsService: ProductsService
  ) {
    this.productForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      img: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const observer = {
      next: (data: any) => {
        this.categories = data;
      },
      error: (err: Error) => alert(err.message),
      complete: () => console.log(`completed! Done!`, this.categories),
    };
    // this.productsService.getCategories().subscribe(observer);
  }
  get newCategory() {
    return this.productForm.get('category');
  }
  changeCategory(e: any) {
    //  this.cityName?.setValue(e.target.value, {
    //    onlySelf: true,
    //  });
  }
  onSubmit(): void {
    // this.isSubmitted = true;
    const observer = {
      next: () => {
        alert('added succesfully next!');
      },
      error: (err: Error) => alert(err.message),
      complete: () => console.log('completed! Done!'),
    };
    if (this.productForm.valid) {
      this.productsService
        .addProduct(this.productForm.value)
        .subscribe(observer);
    }
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files;

    if (file) {
      const parsedFile = file[0];
      // this.productForm.patchValue({ img: parsedFile });
      let img = this.productForm.get('img');
      if (img) {
        img.updateValueAndValidity();
        console.log(img);
      }
    }

    console.log(this.productForm);
  }
}
