import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarModule } from 'ng-sidebar';
import { MeasureBuilderService } from './shared/shared-services/measuresBuilder/measure-builder.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxPermissionsModule } from 'ngx-permissions';
import { LoginService } from './shared/shared-services/login/services/login.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SidebarModule.forRoot(),
    NgxPermissionsModule.forRoot()
  ],
  providers: [MeasureBuilderService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
