import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SensorRoutingModule } from './sensor-routing.module';
import { CreateComponent } from './pages/create/create.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { SharedModule } from 'src/app/shared/layout/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ActiveCompanyDirective } from 'src/app/features/vehicle/directives/active-company.directive';

import { SidebarModule } from 'ng-sidebar';
import { SensorCardComponent } from './components/sensor-card/sensor-card.component';
import { ChartsModule } from 'ng2-charts';
import {NgbModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VehicleService } from 'src/app/shared/shared-services/vehicle/vehicle.service';
import { CertifierService } from 'src/app/shared/shared-services/certifier/certifier.service';
import { ActiveCerfifierDirective } from './directives/active-cerfifier.directive';
import { NgxPermissionsModule } from 'ngx-permissions';



@NgModule({
  declarations: [CreateComponent, OverviewComponent, SensorCardComponent, ActiveCerfifierDirective],
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
    SensorRoutingModule
  ],
  providers : [VehicleService, CertifierService ]
})
export class SensorModule { }
