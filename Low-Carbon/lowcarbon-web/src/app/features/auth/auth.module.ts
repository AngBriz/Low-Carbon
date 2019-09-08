import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http'; 
import { LoginService } from 'src/app/shared/shared-services/login/services/login.service';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NgxPermissionsModule.forChild(),
    AuthRoutingModule,
    HttpClientModule
  ],
  providers : []
})
export class AuthModule { }
