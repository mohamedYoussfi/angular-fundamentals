import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {CustomersComponent} from "./customers/customers.component";
import {NewProductComponent} from "./new-product/new-product.component";

const routes: Routes = [
  {path : "products", component : ProductsComponent},
  {path : "customers" , component : CustomersComponent},
  {path : "newProduct" , component : NewProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
