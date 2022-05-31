import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';



import { SidemenuComponent } from './sidemenu/sidemenu.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UsersComponent } from './users/users.component';
import { DashloginComponent } from './Dashlogin/dashlogin.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrderComponent } from './order/order.component';

import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProductsComponent } from './products/products.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { PendingOrderComponent } from './pending-order/pending-order.component';
import { AcceptedOrderComponent } from './accepted-order/accepted-order.component';
import { RejectedOrderComponent } from './rejected-order/rejected-order.component';
import { AddUserComponent } from './add-user/add-user.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';


@NgModule({
  declarations: [AdminComponent, AdminHeaderComponent, SidemenuComponent ,
    DashboardComponent,
    AddProductComponent,
    DashloginComponent,
    UsersComponent,
    EditProductComponent,
    CategoriesComponent,
    OrderComponent,
    ProductsComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddProductComponent,
    EditProductComponent,
    PendingOrderComponent,
    AcceptedOrderComponent,
    RejectedOrderComponent,
    AddUserComponent,
    OrderDetailComponent
   ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,


  ],
})
export class AdminModule {}
