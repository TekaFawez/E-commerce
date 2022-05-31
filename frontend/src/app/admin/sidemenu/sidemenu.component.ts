import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
//import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }
  logoutUser() {
    this.authService.logout();
  }
}
