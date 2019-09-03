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
import { CertificateSensorService } from './CertificateSensor.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-certificatesensor',
  templateUrl: './CertificateSensor.component.html',
  styleUrls: ['./CertificateSensor.component.css'],
  providers: [CertificateSensorService]
})
export class CertificateSensorComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  certificateId = new FormControl('', Validators.required);
  timeExpedition = new FormControl('', Validators.required);
  timeRevision = new FormControl('', Validators.required);
  companyId = new FormControl('', Validators.required);

  constructor(public serviceCertificateSensor: CertificateSensorService, fb: FormBuilder) {
    this.myForm = fb.group({
      certificateId: this.certificateId,
      timeExpedition: this.timeExpedition,
      timeRevision: this.timeRevision,
      companyId: this.companyId
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCertificateSensor.getAll()
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
      $class: 'org.proyecto.lowcarbon.CertificateSensor',
      'certificateId': this.certificateId.value,
      'timeExpedition': this.timeExpedition.value,
      'timeRevision': this.timeRevision.value,
      'companyId': this.companyId.value
    };

    this.myForm.setValue({
      'certificateId': null,
      'timeExpedition': null,
      'timeRevision': null,
      'companyId': null
    });

    return this.serviceCertificateSensor.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'certificateId': null,
        'timeExpedition': null,
        'timeRevision': null,
        'companyId': null
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
      $class: 'org.proyecto.lowcarbon.CertificateSensor',
      'timeExpedition': this.timeExpedition.value,
      'timeRevision': this.timeRevision.value,
      'companyId': this.companyId.value
    };

    return this.serviceCertificateSensor.updateAsset(form.get('certificateId').value, this.asset)
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

    return this.serviceCertificateSensor.deleteAsset(this.currentId)
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

    return this.serviceCertificateSensor.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'certificateId': null,
        'timeExpedition': null,
        'timeRevision': null,
        'companyId': null
      };

      if (result.certificateId) {
        formObject.certificateId = result.certificateId;
      } else {
        formObject.certificateId = null;
      }

      if (result.timeExpedition) {
        formObject.timeExpedition = result.timeExpedition;
      } else {
        formObject.timeExpedition = null;
      }

      if (result.timeRevision) {
        formObject.timeRevision = result.timeRevision;
      } else {
        formObject.timeRevision = null;
      }

      if (result.companyId) {
        formObject.companyId = result.companyId;
      } else {
        formObject.companyId = null;
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
      'certificateId': null,
      'timeExpedition': null,
      'timeRevision': null,
      'companyId': null
      });
  }

}
