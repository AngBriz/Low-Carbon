import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { CreateComponent } from './pages/create/create.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { PermissionsNames } from 'src/app/shared/permissions/permissions';


const routes: Routes = [
  {
    path: '', component: HeaderComponent,
    children: [
      {
        path: '', component: OverviewComponent, canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [PermissionsNames.CERTIFIER, PermissionsNames.COMPANY, PermissionsNames.ADMIN],
          }
        }
      },
      { path: 'create', component: CreateComponent , canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: [PermissionsNames.COMPANY, PermissionsNames.ADMIN],
        }
      }}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
