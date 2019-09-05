import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from 'src/app/shared/shared-services/company/company.service';
import { Observable } from 'rxjs';
import { Company } from 'src/app/shared/shared-services/company/models/company';
import { VehicleService } from 'src/app/shared/shared-services/vehicle/vehicle.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @ViewChild('successCreateVehicle', {static : false}) private successCreateVehicle: SwalComponent;
  @ViewChild('errorCreateVehicle', {static : false}) private errorCreateVehicle: SwalComponent;
  companies$: Observable<Company[]>;
  companyIdSelected: string;
  vehicleForm : FormGroup;

  constructor(private companyService : CompanyService, private vehicleService : VehicleService, private router : Router) { }

  ngOnInit() {
    this.vehicleForm = new FormGroup({
      chasisNumber: new FormControl(''),
    });



    this.companies$ = this.companyService.getCompanies()
  }

  createVehicle(){
    this.vehicleService.create({
      status : 'ON',
      companyId : this.companyIdSelected,
      sensor1Id : '',
      sensor2Id : "",
      sensor3Id : "",
      vinId : this.vehicleForm.controls["chasisNumber"].value
    }).subscribe(
      o => this.successCreateVehicle.show().then(() => this.router.navigate(['/vehicle'])),
      err => this.errorCreateVehicle.show()
    )
  }

  companyHasIdSelected(companyId : string){
    this.companyIdSelected = companyId;
  }
}
