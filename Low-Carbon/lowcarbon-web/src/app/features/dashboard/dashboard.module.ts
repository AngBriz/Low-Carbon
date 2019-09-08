import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/layout/shared.module';
import { MeasuresService } from 'src/app/shared/shared-services/measures/measures.service';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { FormatNumberPipe } from './pipes/format-number.pipe';
import { VehicleService } from 'src/app/shared/shared-services/vehicle/vehicle.service';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  declarations: [DashboardComponent, DateRangeComponent, FormatNumberPipe],
  imports: [
    CommonModule,
    SharedModule,
    NgxGaugeModule,
    FormsModule,
    NgbDatepickerModule,
    NgxPermissionsModule.forChild(),
    HttpClientModule,
    ChartsModule,
    DashboardRoutingModule,
  ],
  providers : [MeasuresService, VehicleService]
})
export class DashboardModule { }
