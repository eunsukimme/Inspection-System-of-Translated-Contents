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
import { QAService } from './QA.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-qa',
  templateUrl: './QA.component.html',
  styleUrls: ['./QA.component.css'],
  providers: [QAService]
})
export class QAComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  info = new FormControl('', Validators.required);
  contributes = new FormControl('', Validators.required);
  value = new FormControl('', Validators.required);
  select_value = new FormControl('', Validators.required);
  hash = new FormControl('', Validators.required);
  contributed_book_list = new FormControl('', Validators.required);
  P_id = new FormControl('', Validators.required);


  constructor(public serviceQA: QAService, fb: FormBuilder) {
    this.myForm = fb.group({
      info: this.info,
      contributes: this.contributes,
      value: this.value,
      select_value: this.select_value,
      hash: this.hash,
      contributed_book_list: this.contributed_book_list,
      P_id: this.P_id
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceQA.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.example.mynetwork.QA',
      'info': this.info.value,
      'contributes': this.contributes.value,
      'value': this.value.value,
      'select_value': this.select_value.value,
      'hash': this.hash.value,
      'contributed_book_list': this.contributed_book_list.value,
      'P_id': this.P_id.value
    };

    this.myForm.setValue({
      'info': null,
      'contributes': null,
      'value': null,
      'select_value': null,
      'hash': null,
      'contributed_book_list': null,
      'P_id': null
    });

    return this.serviceQA.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'info': null,
        'contributes': null,
        'value': null,
        'select_value': null,
        'hash': null,
        'contributed_book_list': null,
        'P_id': null
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.example.mynetwork.QA',
      'info': this.info.value,
      'contributes': this.contributes.value,
      'value': this.value.value,
      'select_value': this.select_value.value,
      'hash': this.hash.value,
      'contributed_book_list': this.contributed_book_list.value,
    };

    return this.serviceQA.updateParticipant(form.get('P_id').value, this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceQA.deleteParticipant(this.currentId)
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

    return this.serviceQA.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'info': null,
        'contributes': null,
        'value': null,
        'select_value': null,
        'hash': null,
        'contributed_book_list': null,
        'P_id': null
      };

      if (result.info) {
        formObject.info = result.info;
      } else {
        formObject.info = null;
      }

      if (result.contributes) {
        formObject.contributes = result.contributes;
      } else {
        formObject.contributes = null;
      }

      if (result.value) {
        formObject.value = result.value;
      } else {
        formObject.value = null;
      }

      if (result.select_value) {
        formObject.select_value = result.select_value;
      } else {
        formObject.select_value = null;
      }

      if (result.hash) {
        formObject.hash = result.hash;
      } else {
        formObject.hash = null;
      }

      if (result.contributed_book_list) {
        formObject.contributed_book_list = result.contributed_book_list;
      } else {
        formObject.contributed_book_list = null;
      }

      if (result.P_id) {
        formObject.P_id = result.P_id;
      } else {
        formObject.P_id = null;
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
      'info': null,
      'contributes': null,
      'value': null,
      'select_value': null,
      'hash': null,
      'contributed_book_list': null,
      'P_id': null
    });
  }
}
