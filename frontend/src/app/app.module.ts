// Fawez TEKA
//     https://www.linkedin.com/in/fawez-teka/
//     https://github.com/TekaFawez
//    Copyright © Fawez TEKA . All rights reserved.


import { OrderDetailComponent } from './admin/order-detail/order-detail.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { DashloginComponent } from './admin/Dashlogin/dashlogin.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './user/home/home.component';
import { ProductComponent } from './user/product/product.component';
import { ProductDetailComponent } from './user/product-detail/product-detail.component';
import { WishlistComponent } from './user/wishlist/wishlist.component';
import { FooterComponent } from './user/footer/footer.component';
import { HeaderComponent } from './user/header/header.component';
import { PageNotFoundComponent } from './user/page-not-found/page-not-found.component';
import { AccountComponent } from './user/account/account.component';
import { CartComponent } from './user/cart/cart.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { ContactComponent } from './user/contact/contact.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { SidemenuComponent } from './admin/sidemenu/sidemenu.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessageService } from 'primeng/api';

import { UsersComponent } from './admin/users/users.component';

import { CategoriesComponent } from './admin/categories/categories.component';
import { OrderComponent } from './admin/order/order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { LoginComponent } from './user/login/login.component';
import { ProductsComponent } from './admin/products/products.component';
import {InputNumberModule} from 'primeng/inputnumber';

//import { MaterialModule } from './app.component';
import { TagModule } from 'primeng/tag';

import {FieldsetModule} from 'primeng/fieldset';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
//import { CategoriesService } from '@bluebits/products';
//import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
//import { ConfirmationService, MessageService } from 'primeng/api';
//import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { CategoriesService } from './shared';
//import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

import {InputMaskModule} from 'primeng/inputmask';
import { JwtInterceptor } from './shared/services/jwt.interceptor';
import { ReducerManager, ReducerManagerDispatcher, StoreModule } from '@ngrx/store';
//import { EffectsModule } from '@ngrx/effects';
//import { StoreDevtoolsModule } from '@ngrx/store-devtools';
//import { environment } from 'src/environments/environment';
//import { UsersEffects } from './user/state/users.effects';
//import { ToDoEffect } from './ToDoEffects';
import * as fromUsers from './user/state/users.reducer';
import { UsersEffects } from './user/state/users.effects';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './user/register/register.component';
import { UsersFacade } from './user/state/users.facade';
import { ProductListComponent } from './user/product-list/product-list.component';




const UX_MODULE = [
  CardModule,
  ToastModule,
  InputTextModule,
  TableModule,
  ToolbarModule,
  ButtonModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule,
  TagModule,
  InputMaskModule,
  FieldsetModule
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    ProductDetailComponent,
    WishlistComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    AccountComponent,
    CartComponent,
    CheckoutComponent,
    ContactComponent,
    UserComponent,
    AdminComponent,
     AdminHeaderComponent, SidemenuComponent ,
    DashboardComponent,
AddCategoryComponent,
    LoginComponent,

ProductsComponent,
    CategoriesComponent,
    OrderComponent,
   AddProductComponent,
   DashloginComponent,
   AddUserComponent,
   UsersComponent,
   UserComponent,

   OrderDetailComponent,
       RegisterComponent,
       ProductListComponent



  ],
  imports: [
    ...UX_MODULE,
    BrowserModule,
    AppRoutingModule,
    IvyCarouselModule,
    CarouselModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
  // EffectsModule.forFeature([UsersEffects]),
   EffectsModule.forRoot([UsersEffects]),
    StoreModule.forRoot({  }),
   EffectsModule.forRoot([]),
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25,
    //   logOnly: environment.production
    // })

  ],
  providers: [CategoriesService,MessageService,ConfirmationService,UsersFacade, ReducerManager,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
