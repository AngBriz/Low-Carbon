/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { SensorComponent } from './Sensor/Sensor.component';
import { CertificateSensorComponent } from './CertificateSensor/CertificateSensor.component';
import { VehicleComponent } from './Vehicle/Vehicle.component';
import { ContractComponent } from './Contract/Contract.component';

import { VehicleCompanyComponent } from './VehicleCompany/VehicleCompany.component';
import { SensorCertifierComponent } from './SensorCertifier/SensorCertifier.component';
import { GovernmentComponent } from './Government/Government.component';
import { ContractorComponent } from './Contractor/Contractor.component';

import { EmisionReadingComponent } from './EmisionReading/EmisionReading.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SensorComponent,
    CertificateSensorComponent,
    VehicleComponent,
    ContractComponent,
    VehicleCompanyComponent,
    SensorCertifierComponent,
    GovernmentComponent,
    ContractorComponent,
    EmisionReadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
