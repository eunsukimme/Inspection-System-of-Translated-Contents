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

'use strict';
/** 
* Track the trade of a commodity from one trader to another 
* @param {org.example.mynetwork.createBook} feedback - the trade to be processed 
* @transaction 
*/  
async function createBook(data) {  
    // namespace 정의  
    const NS = 'org.example.mynetwork';  
    // 에셋 & 참여자 레지스트리 불러옴  
    let bookRegistry = await getAssetRegistry(NS+'.Book');  
    let clientRegistry = await getParticipantRegistry(NS+'.Client');  
    // 리소스 팩토리 생성  
    let factory = getFactory();  
    // 새로운 book 객체 생성  
    let book_id = `${data.client.P_id}_${data.client.books.length}`;  
    let book = factory.newResource(NS, 'Book', book_id);  
    // book 정보 할당  
    book.ISBN = data.ISBN;
    book.client = data.client;  
    book.name = data.name;  
    book.description = data.description;  
    book.feedbacks = [];  
    book.QAs = [];  
    book.qa_num = 0;
    book.qa_selec = [];
    book.vote_qa = [];
    book.select_comment = [];
    book.order_qa = [];
    book.valid = false;
    await bookRegistry.add(book);  
    // client 정보 할당  
    data.client.books.push(book);  
    await clientRegistry.update(data.client);   
  }  
  /** 
  * Track the trade of a commodity from one trader to another 
  * @param {org.example.mynetwork.addFeedback} feedback - the trade to be processed 
  * @transaction 
  */  
  async function addFeedback(feedback) {  
  // NS정의  
    const NS = 'org.example.mynetwork';  
    if(!check_valid(feedback)){
      throw new Error('This Book is END. Contribute to other Book');
      return;
    }
    // feedback의 comment를 qa 기여 이력에 추가  
    feedback.qa.contributes.push(feedback.comment);  
    feedback.book.order_qa.push(feedback.qa);
    // 검수 받은 객체의 기여받은 이력에 QA의 contribute 내용을 푸시
    feedback.book.feedbacks.push(feedback.comment + ' - ' + feedback.qa);
    // 검수에 참여한 QA가 검수받은 객체의 QA목록에 없다면 추가  
    if(!feedback.book.QAs.includes(feedback.qa)){  
      feedback.book.QAs.push(feedback.qa);  
      feedback.book.qa_num++;
      feedback.book.qa_selec.push(0);
    }  
    // QA의 contributed_book_list에 검수한 책이 없다면 추가  
    if(!feedback.qa.contributed_book_list.includes(feedback.book)){ 
      feedback.qa.contributed_book_list.push(feedback.book);  
    }  
    // QA참여자의 기여도 증가  
    feedback.qa.value += 1;  
    // 검수 결과가 반영된 asset레지스트리 업데이트  
    let bookRegistry = await getAssetRegistry(NS+'.Book');  
    await bookRegistry.update(feedback.book);  
    // 기여도 증가가 반연된 QA레지스트리 업데이트  
    let qaRegistry = await getParticipantRegistry(NS+'.QA');  
    await qaRegistry.update(feedback.qa);  
  }  
  /** 
  * Track the trade of a commodity from one trader to another 
  * @param {org.example.mynetwork.hashtag} hashtag - the trade to be processed 
  * @transaction 
  */  
  async function hashtag(hash){
    // NS정의  
    const NS = 'org.example.mynetwork'; 
    // 코멘트 추가
    hash.qa.hash.push(hash.qa_comment);
    // 코멘트 추가된 QA레지스트리 업데이트
    let qaRegistry = await getParticipantRegistry(NS+'.QA');  
    await qaRegistry.update(hash.qa);  
  }
  /** 
  * Track the trade of a commodity from one trader to another 
  * @param {org.example.mynetwork.vote_qa} vote_qa - the trade to be processed 
  * @transaction 
  */ 
  async function vote_qa(vtqa){
    // NS정의  
    const NS = 'org.example.mynetwork';  
    if(!check_valid(vtqa)){
      throw new Error('This Book is END. Vote to other book qa');
      return;
    }
    for(i=0;i<vtqa.book.qa_num;i++){   // for문으로 투표된 qa를 찾는다.
       if(vtqa.book.QAs[i] == vtqa.qa){
         vtqa.book.qa_selec[i]++;      // 해당 qa_selec 증가
       }
    }
    vtqa.book.vote_qa = [];      // vote_qa초기화 (초기화이유 : 특정위치의 문자열삭제후 추가를 모르겠음)
    for(i=0;i<vtqa.book.qa_num;i++){   // vote_qa 재입력
      vtqa.book.vote_qa.push(vtqa.book.QAs[i] + ' - ' + vtqa.book.qa_selec[i]);
    }
    // vote_qa가 추가도니 Book레지스트리 업데이트
    let bookRegistry = await getAssetRegistry(NS+'.Book');  
    await bookRegistry.update(vtqa.book); 
  }
  /** 
  * Track the trade of a commodity from one trader to another 
  * @param {org.example.mynetwork.select_feedback} select_feedback - the trade to be processed 
  * @transaction 
  */
  async function select_feedback(slfb){
    // NS정의  
    const NS = 'org.example.mynetwork';
    if(!check_valid(slfb)){
      throw new Error('This Book is END. Go to another Book');
      return;
    }
    max = slfb.book.qa_selec[0];   // 최대득표 qa선택을 위한 max변수
    qa_count = 0;               // 최대득표 qa의 위치 변수
    selec_qa_num = 0;
    for(i = 0;i<slfb.book.qa_num;i++){   // 투표 많이 받은 qa 선택
      if(slfb.book.qa_selec[i] > max){
        max = slfb.book.qa_selec[i];
        qa_count = i;
      }
    }
    len = slfb.book.order_qa.length;
    for(i = len-1;i<=0;i--){      // 해당 qa의 최신 contribute부터 확인
      if(slfb.book.order_qa[i] == slfb.book.QAs[qa_count]){
        selec_qa_num = i;
        break;
      }
    }
    slfb.qa = slfb.book.QAs[qa_count];
    slfb.qa.select_value += 1;
    slfb.book.valid = true;
    // select_comment에 추가
    slfb.book.select_comment.push(slfb.book.feedbacks[selec_qa_num] + ' - ' + slfb.book.qa_selec[qa_count]);
    // select_comment가 추가된 Book레지스트리 업데이트
    let bookRegistry = await getAssetRegistry(NS+'.Book');  
    await bookRegistry.update(slfb.book);
    let qaRegistry = await getParticipantRegistry(NS+'.QA');  
    await qaRegistry.update(slfb.qa);  
  }
  
  
  function check_valid(cv){
    if(!cv.book.valid){
      return true;
    }
    else{
      return false;
    }
  }