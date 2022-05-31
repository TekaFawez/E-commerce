//import { CategoriesService } from '@bluebits/products';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { observable, timer } from 'rxjs';
import { CategoriesService, Category } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
form! : FormGroup;
isSubmitted = false;
editmode = false;
currentCategoryId?: string;


  constructor(private formBuilder:FormBuilder,private categoriesService:CategoriesService,
    private messageService: MessageService,private location : Location,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      name:['',Validators.required],
      icon:['',Validators.required],
      color:['#fff'],

    })
    this._checkEditMode();
  }
  onSubmit(){
    this.isSubmitted = true;

    if (this.form.invalid) {


    return;}


    const category:Category ={
     // name:this.categoryForm.name.value,
     id:this.currentCategoryId,
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
      color: this.categoryForm['color'].value,


    }
    if(this.editmode){
      this._updateCategory(category);
    } else {
      this._addCategory(category);

    }




  }
  private _addCategory(category : Category){
    this.categoriesService.createCategory(category).subscribe (response=>{
      this.messageService.add({
        severity:'success',
         summary:'success ',
         detail:'Category is created '
        });
        timer(2000).toPromise().then(done=>{
          this.location.back()
        })
    },
    (error)=>{
      this.messageService.add({severity:'error', summary:'Error ', detail:'Category is not created '});

    });

  }
  private _updateCategory (category : Category){
    this.categoriesService.updateCategory(category).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is updated!'
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
          detail: 'Category is not updated!'
        });
      }
    );


  }
  get categoryForm() {
    return this.form.controls;
  }
  private _checkEditMode() {
  this.route.params.subscribe(params=>{
    if(params['id']){
      this.editmode=true;
      this.currentCategoryId=params['id']
      this.categoriesService.getCategory(params['id']).subscribe(category =>{
        this.categoryForm['name'].setValue(category.name);
        this.categoryForm['icon'].setValue(category.icon);
        this.categoryForm['color'].setValue(category.color);

      })
    }
  })

  }

}
