import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Observable, from, of } from 'rxjs';
import { Company, Vehicle } from 'src/app/shared/shared-services/vehicle/models/vehicle';
import { FormGroup, FormControl } from '@angular/forms';
import { CompanyService } from 'src/app/shared/shared-services/company/company.service';
import { VehicleService } from 'src/app/shared/shared-services/vehicle/vehicle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CertifierService } from 'src/app/shared/shared-services/certifier/certifier.service';
import { Certifier } from 'src/app/shared/shared-services/certifier/models/certifier';
import { switchMap, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @ViewChild('successCreateVehicle', {static : false}) private successCreateVehicle: SwalComponent;
  @ViewChild('errorCreateVehicle', {static : false}) private errorCreateVehicle: SwalComponent;
  companies$: Observable<Certifier[]>;
  companyIdSelected: string;
  sensorForm : FormGroup;

  constructor(private companyService : CertifierService, private vehicleService : VehicleService, private router : ActivatedRoute, private navigate : Router) { }

  ngOnInit() {
    this.sensorForm = new FormGroup({
      sensorId: new FormControl(''),
      certificateId : new FormControl('')
    });



    this.companies$ = this.companyService.getCompanies()
  }

  finishFunction(){

  }
 createSensor(){
    this.router.paramMap.pipe(
      switchMap(params => {
        return this.vehicleService.getbyId(params.get("vinid")).pipe(
          switchMap(o => {
            if(params.get("sensorId") === 'sensor1Id'){
              o.sensor1Id = this.sensorForm.controls["sensorId"].value
            }
            if(params.get("sensorId") === "sensor2Id"){
              o.sensor2Id = this.sensorForm.controls["sensorId"].value
            }
            if(params.get("sensorId") === "sensor3Id"){
              o.sensor3Id = this.sensorForm.controls["sensorId"].value
            }
            return this.vehicleService.update(o).pipe(
              tap(()=> this.successCreateVehicle.show().then(() => this.navigate.navigate(['/vehicle']))),
              catchError(() => of(this.errorCreateVehicle.show()))
            )
          })
        )
      })
    ).subscribe()

  }

  companyHasIdSelected(companyId : string){
    this.companyIdSelected = companyId;
  }
}
