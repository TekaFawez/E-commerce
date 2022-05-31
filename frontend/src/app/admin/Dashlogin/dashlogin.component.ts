//import { AuthService } from 'src/app/shared';
import { User } from './../../shared/models/user';
//import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalstorageService } from 'src/app/shared/services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashlogin',
  templateUrl: './dashlogin.component.html',
  styleUrls: ['./dashlogin.component.css']
})
export class DashloginComponent implements OnInit {
 
  loginFormGroup!: FormGroup;
  authError = false;

  isSubmitted = false;
  authMessage = 'Email or Password are wrong';


  constructor( private formBuilder: FormBuilder, private auth:AuthService, 
    private localstorageService: LocalstorageService,
    private router: Router) { }

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
        this.router.navigate(['/admin']);
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
