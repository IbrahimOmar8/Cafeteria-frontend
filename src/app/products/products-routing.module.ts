import { EditProductComponent } from './edit-product/edit-product.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'add', component: AddProductComponent },
  { path: 'edit/:id', component: EditProductComponent },
  { path: 'add/category', component: AddCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
