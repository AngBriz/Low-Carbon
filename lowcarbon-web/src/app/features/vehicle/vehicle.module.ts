import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { CreateComponent } from './pages/create/create.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { SharedModule } from 'src/app/shared/layout/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ActiveCompanyDirective } from './directives/active-company.directive';

import { SidebarModule } from 'ng-sidebar';
import { CarCardComponent } from './components/car-card/car-card.component';
import { ChartsModule } from 'ng2-charts';
import {NgbModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedServicesModule } from 'src/app/shared/shared-services/shared-services.module';
import { CompanyService } from 'src/app/shared/shared-services/company/company.service';
import { HttpClientModule } from '@angular/common/http';
import { CarCardNewComponent } from './components/car-card-new/car-card-new.component';
import { VehicleService } from 'src/app/shared/shared-services/vehicle/vehicle.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleChasisPipe } from './pipes/vehicle-chasis.pipe';
import { NgxPermissionsModule } from 'ngx-permissions';
@NgModule({
  declarations: [CreateComponent, OverviewComponent, ActiveCompanyDirective, CarCardComponent, CarCardNewComponent, VehicleChasisPipe],
  imports: [
    CommonModule,
    SharedModule,
    ArchwizardModule,
    SweetAlert2Module.forRoot(),
    SidebarModule.forRoot(),
    NgbTabsetModule,
    ChartsModule,
    FormsModule,
    NgxPermissionsModule.forChild(),
    ReactiveFormsModule,
    HttpClientModule,
    VehicleRoutingModule,

  ],
  providers : [CompanyService, VehicleService]
})
export class VehicleModule { }
