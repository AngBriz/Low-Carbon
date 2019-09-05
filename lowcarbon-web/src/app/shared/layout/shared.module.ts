import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  ContentComponent } from './content/content.component';
import {  HeaderComponent } from './header/header.component';
import {  MenuBarComponent } from './menu-bar/menu-bar.component';
import {  NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'ng-sidebar';
import { NgxPermissionsModule } from 'ngx-permissions';
import { LoginService } from '../shared-services/login/services/login.service';


@NgModule({
  declarations: [ContentComponent, HeaderComponent, MenuBarComponent, NavBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxPermissionsModule,
    SidebarModule.forRoot()
  ],
  exports : [
    ContentComponent, HeaderComponent, MenuBarComponent, NavBarComponent
  ]
})
export class SharedModule { }
