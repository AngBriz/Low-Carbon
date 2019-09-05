import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared-services/login/services/login.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  user$: Observable<{ email : string, pass : string, permission : string }>;

  constructor(private loginService : LoginService, private router : Router) { }

  ngOnInit() {
    this.user$ = this.loginService.user;
  }

  logout(){
    this.loginService.logout();
    this.router.navigateByUrl('/asdasd')
  }
}
