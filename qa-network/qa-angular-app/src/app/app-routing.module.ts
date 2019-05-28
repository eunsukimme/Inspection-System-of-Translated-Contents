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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { BookComponent } from './Book/Book.component';

import { ClientComponent } from './Client/Client.component';
import { QAComponent } from './QA/QA.component';

import { createBookComponent } from './createBook/createBook.component';
import { addFeedbackComponent } from './addFeedback/addFeedback.component';
import { hashtagComponent } from './hashtag/hashtag.component';
import { vote_qaComponent } from './vote_qa/vote_qa.component';
import { select_feedbackComponent } from './select_feedback/select_feedback.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Book', component: BookComponent },
  { path: 'Client', component: ClientComponent },
  { path: 'QA', component: QAComponent },
  { path: 'createBook', component: createBookComponent },
  { path: 'addFeedback', component: addFeedbackComponent },
  { path: 'hashtag', component: hashtagComponent },
  { path: 'vote_qa', component: vote_qaComponent },
  { path: 'select_feedback', component: select_feedbackComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
