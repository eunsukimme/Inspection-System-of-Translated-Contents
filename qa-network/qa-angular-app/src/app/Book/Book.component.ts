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
import { BookService } from './Book.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-book',
  templateUrl: './Book.component.html',
  styleUrls: ['./Book.component.css'],
  providers: [BookService]
})
export class BookComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  ISBN = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  client = new FormControl('', Validators.required);
  valid = new FormControl('', Validators.required);
  select_comment = new FormControl('', Validators.required);
  feedbacks = new FormControl('', Validators.required);
  vote_qa = new FormControl('', Validators.required);
  qa_num = new FormControl('', Validators.required);
  qa_selec = new FormControl('', Validators.required);
  QAs = new FormControl('', Validators.required);
  order_qa = new FormControl('', Validators.required);
  Obj_id = new FormControl('', Validators.required);

  constructor(public serviceBook: BookService, fb: FormBuilder) {
    this.myForm = fb.group({
      ISBN: this.ISBN,
      name: this.name,
      description: this.description,
      client: this.client,
      valid: this.valid,
      select_comment: this.select_comment,
      feedbacks: this.feedbacks,
      vote_qa: this.vote_qa,
      qa_num: this.qa_num,
      qa_selec: this.qa_selec,
      QAs: this.QAs,
      order_qa: this.order_qa,
      Obj_id: this.Obj_id
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceBook.getAll()
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
      $class: 'org.example.mynetwork.Book',
      'ISBN': this.ISBN.value,
      'name': this.name.value,
      'description': this.description.value,
      'client': this.client.value,
      'valid': this.valid.value,
      'select_comment': this.select_comment.value,
      'feedbacks': this.feedbacks.value,
      'vote_qa': this.vote_qa.value,
      'qa_num': this.qa_num.value,
      'qa_selec': this.qa_selec.value,
      'QAs': this.QAs.value,
      'order_qa': this.order_qa.value,
      'Obj_id': this.Obj_id.value
    };

    this.myForm.setValue({
      'ISBN': null,
      'name': null,
      'description': null,
      'client': null,
      'valid': null,
      'select_comment': null,
      'feedbacks': null,
      'vote_qa': null,
      'qa_num': null,
      'qa_selec': null,
      'QAs': null,
      'order_qa': null,
      'Obj_id': null
    });

    return this.serviceBook.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'ISBN': null,
        'name': null,
        'description': null,
        'client': null,
        'valid': null,
        'select_comment': null,
        'feedbacks': null,
        'vote_qa': null,
        'qa_num': null,
        'qa_selec': null,
        'QAs': null,
        'order_qa': null,
        'Obj_id': null
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
      $class: 'org.example.mynetwork.Book',
      'ISBN': this.ISBN.value,
      'name': this.name.value,
      'description': this.description.value,
      'client': this.client.value,
      'valid': this.valid.value,
      'select_comment': this.select_comment.value,
      'feedbacks': this.feedbacks.value,
      'vote_qa': this.vote_qa.value,
      'qa_num': this.qa_num.value,
      'qa_selec': this.qa_selec.value,
      'QAs': this.QAs.value,
      'order_qa': this.order_qa.value,
    };

    return this.serviceBook.updateAsset(form.get('Obj_id').value, this.asset)
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

    return this.serviceBook.deleteAsset(this.currentId)
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

    return this.serviceBook.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'ISBN': null,
        'name': null,
        'description': null,
        'client': null,
        'valid': null,
        'select_comment': null,
        'feedbacks': null,
        'vote_qa': null,
        'qa_num': null,
        'qa_selec': null,
        'QAs': null,
        'order_qa': null,
        'Obj_id': null
      };

      if (result.ISBN) {
        formObject.ISBN = result.ISBN;
      } else {
        formObject.ISBN = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.description) {
        formObject.description = result.description;
      } else {
        formObject.description = null;
      }

      if (result.client) {
        formObject.client = result.client;
      } else {
        formObject.client = null;
      }

      if (result.valid) {
        formObject.valid = result.valid;
      } else {
        formObject.valid = null;
      }

      if (result.select_comment) {
        formObject.select_comment = result.select_comment;
      } else {
        formObject.select_comment = null;
      }

      if (result.feedbacks) {
        formObject.feedbacks = result.feedbacks;
      } else {
        formObject.feedbacks = null;
      }

      if (result.vote_qa) {
        formObject.vote_qa = result.vote_qa;
      } else {
        formObject.vote_qa = null;
      }

      if (result.qa_num) {
        formObject.qa_num = result.qa_num;
      } else {
        formObject.qa_num = null;
      }

      if (result.qa_selec) {
        formObject.qa_selec = result.qa_selec;
      } else {
        formObject.qa_selec = null;
      }

      if (result.QAs) {
        formObject.QAs = result.QAs;
      } else {
        formObject.QAs = null;
      }

      if (result.order_qa) {
        formObject.order_qa = result.order_qa;
      } else {
        formObject.order_qa = null;
      }

      if (result.Obj_id) {
        formObject.Obj_id = result.Obj_id;
      } else {
        formObject.Obj_id = null;
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
      'ISBN': null,
      'name': null,
      'description': null,
      'client': null,
      'valid': null,
      'select_comment': null,
      'feedbacks': null,
      'vote_qa': null,
      'qa_num': null,
      'qa_selec': null,
      'QAs': null,
      'order_qa': null,
      'Obj_id': null
      });
  }

}
