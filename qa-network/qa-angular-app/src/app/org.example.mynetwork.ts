import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.mynetwork{
   export abstract class Object extends Asset {
      Obj_id: string;
   }
   export abstract class Peer extends Participant {
      P_id: string;
   }
   export class Info {
      name: string;
      age: string;
   }
   export class Book extends Object {
      ISBN: string;
      name: string;
      description: string;
      client: Client;
      valid: boolean;
      select_comment: string[];
      feedbacks: string[];
      vote_qa: string[];
      qa_num: number;
      qa_selec: number[];
      QAs: QA[];
      order_qa: QA[];
   }
   export class Client extends Peer {
      info: Info;
      books: Object[];
   }
   export class QA extends Peer {
      info: Info;
      contributes: string[];
      value: number;
      select_value: number;
      hash: string[];
      contributed_book_list: Book[];
   }
   export class createBook extends Transaction {
      ISBN: string;
      name: string;
      description: string;
      client: Client;
   }
   export class addFeedback extends Transaction {
      comment: string;
      book: Book;
      qa: QA;
   }
   export class hashtag extends Transaction {
      qa_comment: string;
      qa: QA;
   }
   export class vote_qa extends Transaction {
      book: Book;
      qa: QA;
   }
   export class select_feedback extends Transaction {
      book: Book;
      qa: QA;
   }
// }
