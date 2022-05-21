import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService : AuthenticationService, private router : Router) { }

  ngOnInit(): void {
  }

  handleLogout() {
    this.authService.logout().subscribe({
      next : (data)=>{
        this.router.navigateByUrl("/login")
      }
    })
  }
}
