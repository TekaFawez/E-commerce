// Fawez TEKA
//     https://www.linkedin.com/in/fawez-teka/
//     https://github.com/TekaFawez
//    Copyright © Fawez TEKA . All rights reserved.


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import * as countriesLib from 'i18n-iso-countries'
import { UsersFacade } from 'src/app/user/state/users.facade';
//import { UsersFacade } from 'src/app/user/state/users.facade';
//import { UsersFacade } from 'src/app/user/state/users.facade';
//import { UsersFacade } from 'src/app/user/state/users.facade';
declare const require :any ;



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient, private usersFacade: UsersFacade) { }
  getUsers(): Observable<User[]> {

    return this.http.get<User[]>('http://localhost:3000/api/v1/users');
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${'http://localhost:3000/api/v1/users'}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/api/v1/users', user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${'http://localhost:3000/api/v1/users'}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${'http://localhost:3000/api/v1/users/'}${userId}`);
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {

      return {
        id: entry[0],
        name: entry[1]

      };

    });
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }
  initAppSession() {
    this.usersFacade.buildUserSession();
  }
  observeCurrentUser() {
    return this.usersFacade.currentUser$;
  }
  isCurrentUserAuth() {
    return this.usersFacade.isAuthenticated$;
  }
}
