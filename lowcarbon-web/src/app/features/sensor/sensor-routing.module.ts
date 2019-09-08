import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { CreateComponent } from './pages/create/create.component';

const routes: Routes = [
  { path : '', component : HeaderComponent,
    children : [
      { path : 'create/:sensorId/vinid/:vinid/companyid/:companyId', component : CreateComponent }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SensorRoutingModule { }
