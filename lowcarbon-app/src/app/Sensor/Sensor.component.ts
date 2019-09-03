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
import { SensorService } from './Sensor.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-sensor',
  templateUrl: './Sensor.component.html',
  styleUrls: ['./Sensor.component.css'],
  providers: [SensorService]
})
export class SensorComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  sensorId = new FormControl('', Validators.required);
  vehicleId = new FormControl('', Validators.required);
  certificadoId = new FormControl('', Validators.required);
  companyId = new FormControl('', Validators.required);
  contractId = new FormControl('', Validators.required);
  dataSensor = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);

  constructor(public serviceSensor: SensorService, fb: FormBuilder) {
    this.myForm = fb.group({
      sensorId: this.sensorId,
      vehicleId: this.vehicleId,
      certificadoId: this.certificadoId,
      companyId: this.companyId,
      contractId: this.contractId,
      dataSensor: this.dataSensor,
      status: this.status
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceSensor.getAll()
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
      $class: 'org.proyecto.lowcarbon.Sensor',
      'sensorId': this.sensorId.value,
      'vehicleId': this.vehicleId.value,
      'certificadoId': this.certificadoId.value,
      'companyId': this.companyId.value,
      'contractId': this.contractId.value,
      'dataSensor': this.dataSensor.value,
      'status': this.status.value
    };

    this.myForm.setValue({
      'sensorId': null,
      'vehicleId': null,
      'certificadoId': null,
      'companyId': null,
      'contractId': null,
      'dataSensor': null,
      'status': null
    });

    return this.serviceSensor.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'sensorId': null,
        'vehicleId': null,
        'certificadoId': null,
        'companyId': null,
        'contractId': null,
        'dataSensor': null,
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
      $class: 'org.proyecto.lowcarbon.Sensor',
      'vehicleId': this.vehicleId.value,
      'certificadoId': this.certificadoId.value,
      'companyId': this.companyId.value,
      'contractId': this.contractId.value,
      'dataSensor': this.dataSensor.value,
      'status': this.status.value
    };

    return this.serviceSensor.updateAsset(form.get('sensorId').value, this.asset)
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

    return this.serviceSensor.deleteAsset(this.currentId)
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

    return this.serviceSensor.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'sensorId': null,
        'vehicleId': null,
        'certificadoId': null,
        'companyId': null,
        'contractId': null,
        'dataSensor': null,
        'status': null
      };

      if (result.sensorId) {
        formObject.sensorId = result.sensorId;
      } else {
        formObject.sensorId = null;
      }

      if (result.vehicleId) {
        formObject.vehicleId = result.vehicleId;
      } else {
        formObject.vehicleId = null;
      }

      if (result.certificadoId) {
        formObject.certificadoId = result.certificadoId;
      } else {
        formObject.certificadoId = null;
      }

      if (result.companyId) {
        formObject.companyId = result.companyId;
      } else {
        formObject.companyId = null;
      }

      if (result.contractId) {
        formObject.contractId = result.contractId;
      } else {
        formObject.contractId = null;
      }

      if (result.dataSensor) {
        formObject.dataSensor = result.dataSensor;
      } else {
        formObject.dataSensor = null;
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
      'sensorId': null,
      'vehicleId': null,
      'certificadoId': null,
      'companyId': null,
      'contractId': null,
      'dataSensor': null,
      'status': null
      });
  }

}
