import { Injectable } from '@angular/core';
import { PermissionsNames } from 'src/app/shared/permissions/permissions';
import { BehaviorSubject } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {
  user : BehaviorSubject<{ email : string, pass : string, permission : string }>;

  usersData = [
    { email : "certifier@lowcarbon.com", pass : "certifier", permission : PermissionsNames.CERTIFIER },
    { email : "goverment@lowcarbon.com", pass : "goverment", permission : PermissionsNames.GOVERMENT },
    { email : "company@lowcarbon.com", pass : "company", permission : PermissionsNames.COMPANY },
    { email : "contractor@lowcarbon.com", pass : "contractor", permission : PermissionsNames.CONTRACTOR },
    { email : "admin", pass : "admin", permission : PermissionsNames.ADMIN }
  ]
  constructor(private permissionsService: NgxPermissionsService) {
    this.user = new BehaviorSubject<{ email : string, pass : string, permission : string }>(null);

   }

  login(email : string, password : string){

    if(!environment.production && !email && !password){
      let admin = this.usersData.find(o => o.email === 'admin');
      this.user.next(admin)
      this.permissionsService.loadPermissions([admin.permission])
      return admin;
    }

    const user = this.usersData.find(o => o.email === email && o.pass === password);
    if(user){
      this.permissionsService.loadPermissions([user.permission])
      this.user.next(user);
      return user;
    }else{
      return null;
    }
  }

  isLogged(){
    if(this.user.value){
      return true;
    }else{
      return false;
    }
  }

  logout(){
    this.user.next(null)
  }
}
