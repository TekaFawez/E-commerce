import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  products : Product []= [];

  constructor(private productsService :ProductsService,private messageService:MessageService,
    private router : Router) { }

  ngOnInit(): void {
    this._getProducts();

  }
  private _getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
  deleteProduct(productId: string) {
    this.productsService.deleteProduct(productId).subscribe(
      (response) =>{
        this._getProducts();

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'product is deleted!'
      });
    },
    (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'product is not deleted!'
      });
    }
    )
  }
  updateProduct(productid: string) {
    this.router.navigateByUrl(`admin/add-product/${productid}`)

  }
  // updateProduct(productId: string) {
  //   this.productsService.updateProduct(productid).subscribe(
  //     (response) =>{
  //       this._getProducts();

  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Success',
  //       detail: 'product is updated!'
  //     });
  //   },
  //   (error) => {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: 'product is not updated!'
  //     });
  //   }
  //   )
  // }

}
