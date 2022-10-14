import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/orders/orders.component';
// import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path: "",redirectTo:"/home", pathMatch:"full"},
  {path: "home", component: HomeComponent},
  {path:"card", component: CardComponent},
  {path: "orders",component:OrdersComponent},
 
  // ,{path:"**", component: NotFoundComponent}];
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
