import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/shared/shared-services/login/services/login.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorLogin: boolean;
  
  constructor(private loginService : LoginService, private router : Router) 
  { 

  }

  ngOnInit() {

  }

  async login(email, password){
    if(this.loginService.login(email,password)){
      await this.router.navigate(['/dashboard'])
    }else{
      this.errorLogin = true;
    }
  }

}
