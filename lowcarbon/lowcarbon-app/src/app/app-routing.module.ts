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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Sensor', component: SensorComponent },
  { path: 'CertificateSensor', component: CertificateSensorComponent },
  { path: 'Vehicle', component: VehicleComponent },
  { path: 'Contract', component: ContractComponent },
  { path: 'VehicleCompany', component: VehicleCompanyComponent },
  { path: 'SensorCertifier', component: SensorCertifierComponent },
  { path: 'Government', component: GovernmentComponent },
  { path: 'Contractor', component: ContractorComponent },
  { path: 'EmisionReading', component: EmisionReadingComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
