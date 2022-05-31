// Fawez TEKA
//     https://www.linkedin.com/in/fawez-teka/
//     https://github.com/TekaFawez
//    Copyright © Fawez TEKA . All rights reserved.


//import { RegisterComponent } from './user/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AdminComponent } from './admin/admin.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EditCategoryComponent } from './admin/edit-category/edit-category.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { DashloginComponent } from './admin/Dashlogin/dashlogin.component';
import { OrderComponent } from './admin/order/order.component';
import { ProductsComponent } from './admin/products/products.component';
import { UsersComponent } from './admin/users/users.component';

import { AccountComponent } from './user/account/account.component';
import { CartComponent } from './user/cart/cart.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { HomeComponent } from './user/home/home.component';
import { PageNotFoundComponent } from './user/page-not-found/page-not-found.component';
import { ProductDetailComponent } from './user/product-detail/product-detail.component';
import { ProductComponent } from './user/product/product.component';
import { UserComponent } from './user/user.component';
import { WishlistComponent } from './user/wishlist/wishlist.component';
import { LoginComponent } from './user/login/login.component';
import { AcceptedOrderComponent } from './admin/accepted-order/accepted-order.component';
import { RejectedOrderComponent } from './admin/rejected-order/rejected-order.component';
import { PendingOrderComponent } from './admin/pending-order/pending-order.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { OrderDetailComponent } from './admin/order-detail/order-detail.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { UAuthGuardService } from './shared/services/u-auth-guard.service';
import { RegisterComponent } from './user/register/register.component';


const routes: Routes = [
  {
    path : '',
    component : UserComponent,
    children: [
      {path: '', component : HomeComponent},
      {path: 'home', component : HomeComponent},
      {
        path : 'account',
        component : AccountComponent
      },
      {
        path : 'wishlist',
        component : WishlistComponent
      },
      {
        path : 'login',
        component : LoginComponent
      },
      {
        path : 'register',
        component : RegisterComponent
      },

  {
    path : 'checkout',
 //   canActivate: [UAuthGuardService],

    component : CheckoutComponent
  },
  {
    path : 'cart',
    component : CartComponent
  },
  {
    path : 'product',
    component : ProductComponent
  },
  {
    path : 'product-detail',
    component : ProductDetailComponent
  },


    ]
  },
  {
    path : 'admin',
    component : AdminComponent,
    children: [
      {
        path : 'login-admin',
        component : DashloginComponent
      },
    ]

  } ,


  {

    path : 'admin',
    component : AdminComponent,
    canActivate: [AuthGuardService],

    children: [
      {path: '', component : DashboardComponent},
      {
        path : 'categories',
        component : CategoriesComponent
      },

      {
        path : 'add-category',
        component : AddCategoryComponent
      },
      {
        path : 'add-category/:id',
        component : AddCategoryComponent
      },
      {
        path : 'edit-category',
        component : EditCategoryComponent
      },


  {
    path : 'order',
    component : OrderComponent
  },
  {
    path: 'orders/:id',
    component: OrderDetailComponent
  },
  {
    path : 'accepted-order',
    component : AcceptedOrderComponent
  },
  {
    path : 'rejected-order',
    component : RejectedOrderComponent
  },
  {
    path : 'pending-order',
    component : PendingOrderComponent
  },
  {
    path : 'add-product',
    component : AddProductComponent
  },
  {
    path : 'add-product/:id',
    component : AddProductComponent
  },
  {
    path : 'products',
    component : ProductsComponent
  },
  {
    path : 'edit-product',
    component : EditProductComponent
  },
  {
    path : 'users',
    component : UsersComponent
  },
  {
    path : 'add-user',
    component : AddUserComponent
  },
  {
    path : 'add-user/:id',
    component : AddUserComponent
  },


    ]
  },





  {
    path:'**',
    component: PageNotFoundComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
