import { Router } from '@angular/router';
import { UsersService } from './../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
//import { timer } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { timer } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSubmitted = false;
  constructor( private formBuilder: FormBuilder,private usersService:UsersService,private location : Location,
    private router: Router,
   // private location:Location,
    private messageService: MessageService,
    ) { }

  ngOnInit(): void {
    this._initForm();

  }
  private _initForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name:['', Validators.required],
      phone:  ['', [Validators.required, Validators.max(15)]],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    });
  }


  // onSubmit() {
  //   this.isSubmitted = true;
  //   // tchouf user mawjoud wala ken le tokhrej if(this.loginFormGroup.invalid) {return}
  //   if(this.loginFormGroup.invalid) {return}
  //   const user: User = {

  //     name: this.loginForm['name'].value,
  //     email: this.loginForm['email'].value,
  //     password:this.loginForm['password'].value,
  //     phone: this.loginForm['phone'].value,

  //     street: this.loginForm['street'].value,
  //     apartment: this.loginForm['apartment'].value,
  //     zip: this.loginForm['zip'].value,
  //     city: this.loginForm['city'].value,
  //     country: this.loginForm['country'].value
  //   };

  //   this.usersService.createUser(this.loginFormGroup.value).subscribe(

  //     () => {
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Success',
  //         detail: `User is created!`
  //       });
  //       this.router.navigate(['/login']);
  //     },
  //     () => {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Error',
  //         detail: 'User is not created!'
  //       });
  //     }
  //   );

  // }
  addUser() {
    // let data = this.loginFormGroup.value;
    // console.log(data);



    // console.log(this.loginFormGroup.value);

    // this.usersService.createUser(this.loginFormGroup.value).subscribe(
    //   res=>{


    //     this.router.navigate(['/login']);
    //   },
    //   err=>{
    //     console.log(err);
    //   }
    // )



       this.isSubmitted = true;
    // tchouf user mawjoud wala ken le tokhrej if(this.loginFormGroup.invalid) {return}
    if(this.loginFormGroup.invalid) {return}
    const user: User = {

      name: this.loginForm['name'].value,
      email: this.loginForm['email'].value,
      password:this.loginForm['password'].value,
      phone: this.loginForm['phone'].value,

      street: this.loginForm['street'].value,
      apartment: this.loginForm['apartment'].value,
      zip: this.loginForm['zip'].value,
      city: this.loginForm['city'].value,
      country: this.loginForm['country'].value
    };

    this.usersService.createUser(this.loginFormGroup.value).subscribe(

      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User is created!`
        });
        this.router.navigate(['/login']);
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created!'
        });
      }
    );

  }


  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} is created!`
        });
        this.router.navigate(['/login']);

      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created!'
        });
      }
    );
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.loginFormGroup.invalid) {
      return;
    }
    const user: User = {

      name: this.userForm['name'].value,
      email: this.userForm['email'].value,
      password:this.userForm['password'].value,
      phone: this.userForm['phone'].value,

      street: this.userForm['street'].value,
      apartment: this.userForm['apartment'].value,
      zip: this.userForm['zip'].value,
      city: this.userForm['city'].value,

    };

      this._addUser(user);

  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
  get userForm() {
    return this.loginFormGroup.controls;
  }
}
