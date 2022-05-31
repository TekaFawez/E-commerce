import { Router } from '@angular/router';
import {  ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from './../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private usersService:UsersService,
    private messageService:MessageService,
    private  confirmationService:ConfirmationService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this._getUsers();

  }
  private _getUsers() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  
  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
            accept: () => {
    this.usersService.deleteUser(userId).subscribe(
      (response) =>{
        this._getUsers();

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
  });
  }
  updateUser(userid: string) {
    this.router.navigateByUrl(`admin/add-user/${userid}`)

  }
  getCountryName(countryKey: string) {
    if (countryKey){
    }
    return this.usersService.getCountry(countryKey);

  }
  

  }


