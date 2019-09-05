import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { PermissionsNames } from 'src/app/shared/permissions/permissions';



const routes: Routes = [
  {
    path: '', component: HeaderComponent,
    children: [
      {
        path: '', component: DashboardComponent, canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [ PermissionsNames.GOVERMENT, PermissionsNames.CONTRACTOR, PermissionsNames.COMPANY, PermissionsNames.CERTIFIER, PermissionsNames.ADMIN],
          }
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
