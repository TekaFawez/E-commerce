import { ProductsService } from './../../shared/services/products.service';
import { ProductsModule } from './../../shared/products.module';
//import { CategoriesComponent } from './../categories/categories.component';
//import { CategoriesService } from '@bluebits/products';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriesService, Category } from 'src/app/shared';
import { timer } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  editmode = false;
  form!: FormGroup;
  isSubmitted = false;
  categories: Category[]   = [];
  imageDisplay?: string | ArrayBuffer | null ;
  currentProductId !: string ;
  constructor(    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
  private messageService: MessageService,
   private location: Location,
   private productsService:ProductsService,
    private route: ActivatedRoute
     ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();

  }
  onImageUpload(event: any){
   // console.log(event);
   const file = event.target.files[0];
   if (file) {
     this.form.patchValue({ image: file });
    //  this.form.get('image').updateValueAndValidity();
     const fileReader = new FileReader();
     fileReader.onload = () => {
       this.imageDisplay = fileReader.result;
     };
     fileReader.readAsDataURL(file);
   }
  }
  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false]
    });
  }
  onSubmit(){
    this.isSubmitted = true;

    if (this.form.invalid) {
    return;}
    const productFormData = new FormData();
    Object.keys(this.productForm).map((key)=>{
      console.log(key);
      console.log(this.productForm[key].value)
      productFormData.append(key,this.productForm[key].value);


    })
    
    if(this.editmode){
      this._updateProduct(productFormData);
    } else {
      
      this._addProduct(productFormData)
    }
  }
  get productForm() {
    return this.form.controls;
  }
  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${product.name} is created!`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not created!'
        });
      }
    );
  }
  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentProductId = params['id'];
        this.productsService.getProduct(params['id']).subscribe((product) => {
          this.productForm['name'].setValue(product.name);
          this.productForm['category'].setValue(product.category?.id);
          this.productForm['brand'].setValue(product.brand);
          this.productForm['price'].setValue(product.price);
          this.productForm['countInStock'].setValue(product.countInStock);
          this.productForm['isFeatured'].setValue(product.isFeatured);
          this.productForm['description'].setValue(product.description);
          this.productForm['richDescription'].setValue(product.richDescription);
          this.imageDisplay = product.image;
          this.productForm['image'].setValidators([]);
          this.productForm['image'].updateValueAndValidity();
        });
      }
    });
  }
  
  private _updateProduct(productFormData: FormData) {
    this.productsService.updateProduct(productFormData,this.currentProductId).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${product.name} is created!`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not created!'
        });
      }
    );
  }

}
