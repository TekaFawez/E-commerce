import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/api/v1/products');
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(`http://localhost:3000/api/v1/products/`, productData);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/api/v1/products/${productId}`);
  }

  updateProduct(productData: FormData, productid: string): Observable<Product> {
    return this.http.put<Product>(`http://localhost:3000/api/v1/products/${productid}`, productData);
  }

   deleteProduct(productId: string): Observable<any> {
   return this.http.delete<any>(`http://localhost:3000/api/v1/products/${productId}`);
   }
}
