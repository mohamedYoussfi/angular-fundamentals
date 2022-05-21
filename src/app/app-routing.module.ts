import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {CustomersComponent} from "./customers/customers.component";
import {NewProductComponent} from "./new-product/new-product.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {LoginComponent} from "./login/login.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthorizationGuard} from "./guards/authorization.guard";

const routes: Routes = [
  {path : "login", component : LoginComponent},
  {path : "", redirectTo:"login", pathMatch:"full"},
  {path : "admin", component : AdminTemplateComponent, canActivate : [AuthorizationGuard], children : [
      {path : "products", component : ProductsComponent},
      {path : "customers" , component : CustomersComponent},
      {path : "newProduct" , component : NewProductComponent},
      {path : "editProduct/:id" , component : ProductEditComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
