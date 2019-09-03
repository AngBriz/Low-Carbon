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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { VehicleService } from './Vehicle.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-vehicle',
  templateUrl: './Vehicle.component.html',
  styleUrls: ['./Vehicle.component.css'],
  providers: [VehicleService]
})
export class VehicleComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  vinId = new FormControl('', Validators.required);
  sensor1Id = new FormControl('', Validators.required);
  sensor2Id = new FormControl('', Validators.required);
  sensor3Id = new FormControl('', Validators.required);
  companyId = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);

  constructor(public serviceVehicle: VehicleService, fb: FormBuilder) {
    this.myForm = fb.group({
      vinId: this.vinId,
      sensor1Id: this.sensor1Id,
      sensor2Id: this.sensor2Id,
      sensor3Id: this.sensor3Id,
      companyId: this.companyId,
      status: this.status
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceVehicle.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.proyecto.lowcarbon.Vehicle',
      'vinId': this.vinId.value,
      'sensor1Id': this.sensor1Id.value,
      'sensor2Id': this.sensor2Id.value,
      'sensor3Id': this.sensor3Id.value,
      'companyId': this.companyId.value,
      'status': this.status.value
    };

    this.myForm.setValue({
      'vinId': null,
      'sensor1Id': null,
      'sensor2Id': null,
      'sensor3Id': null,
      'companyId': null,
      'status': null
    });

    return this.serviceVehicle.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'vinId': null,
        'sensor1Id': null,
        'sensor2Id': null,
        'sensor3Id': null,
        'companyId': null,
        'status': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.proyecto.lowcarbon.Vehicle',
      'sensor1Id': this.sensor1Id.value,
      'sensor2Id': this.sensor2Id.value,
      'sensor3Id': this.sensor3Id.value,
      'companyId': this.companyId.value,
      'status': this.status.value
    };

    return this.serviceVehicle.updateAsset(form.get('vinId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceVehicle.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceVehicle.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'vinId': null,
        'sensor1Id': null,
        'sensor2Id': null,
        'sensor3Id': null,
        'companyId': null,
        'status': null
      };

      if (result.vinId) {
        formObject.vinId = result.vinId;
      } else {
        formObject.vinId = null;
      }

      if (result.sensor1Id) {
        formObject.sensor1Id = result.sensor1Id;
      } else {
        formObject.sensor1Id = null;
      }

      if (result.sensor2Id) {
        formObject.sensor2Id = result.sensor2Id;
      } else {
        formObject.sensor2Id = null;
      }

      if (result.sensor3Id) {
        formObject.sensor3Id = result.sensor3Id;
      } else {
        formObject.sensor3Id = null;
      }

      if (result.companyId) {
        formObject.companyId = result.companyId;
      } else {
        formObject.companyId = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'vinId': null,
      'sensor1Id': null,
      'sensor2Id': null,
      'sensor3Id': null,
      'companyId': null,
      'status': null
      });
  }

}
