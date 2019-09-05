import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';

const routes: Routes = [
  { path : '', loadChildren : './features/auth/auth.module#AuthModule' },
  { path : 'dashboard', loadChildren : './features/dashboard/dashboard.module#DashboardModule' },
  { path : 'sensor', loadChildren : './features/sensor/sensor.module#SensorModule' },
  { path : 'vehicle', loadChildren : './features/vehicle/vehicle.module#VehicleModule' },
  { path: '**', redirectTo : "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
