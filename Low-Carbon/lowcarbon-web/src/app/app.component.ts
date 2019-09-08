import { Component, OnInit } from '@angular/core';
import { MeasureBuilderService } from './shared/shared-services/measuresBuilder/measure-builder.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { PermissionsNames } from './shared/permissions/permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private measureBuilder : MeasureBuilderService){}
  ngOnInit(): void {
   this.measureBuilder.create().subscribe()

  /*  this.http.get('url').subscribe((permissions) => {
      //const perm = ["ADMIN", "EDITOR"]; example of permissions
      this.permissionsService.loadPermissions(permissions);
   })*/

  }
  title = 'ngx-iot';
}
