import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriesService, Category } from 'src/app/shared';
//import { CategoriesService, Category } from '@bluebits/products';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories : Category [] = [];
 

  constructor( private categoriesService: CategoriesService,private messageService: MessageService,
    private router :Router) { }

  ngOnInit(): void {
    this._getCategories()
  }
  
  deleteCategory(categoryId: string) {
  
    this.categoriesService.deleteCategory(categoryId).subscribe(
      (response) =>{
        this._getCategories();

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Category is deleted!'
      });
    },
    (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Category is not deleted!'
      });
    }
    )
  }
  private _getCategories() {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }
  updateCategory(categoryid: string) {
    this.router.navigateByUrl(`admin/add-category/${categoryid}`)

  }
}
