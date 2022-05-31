//import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/shared/models/user";
import { AuthService } from "src/app/shared/services/auth.service";
import { LocalstorageService } from "src/app/shared/services/localstorage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;


  authMessage = 'Email or Password are wrong';

  constructor(    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this._initForm();
 
  }


  private _initForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.loginFormGroup.invalid) return;
    
    this.auth.login( this.loginForm['email'].value, this.loginForm['password'].value).subscribe(
      (user:User)=>{  
        this.authError = false;

       this.localstorageService.setToken(user.token);
        this.router.navigate(['/home']);
      },
      (error: HttpErrorResponse) => { 
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in the Server, please try again later!';
        }
      }
    );
  }


  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
