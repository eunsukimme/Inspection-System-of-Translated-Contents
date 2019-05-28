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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for qa-angular-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be qa-angular-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('qa-angular-app');
    })
  });

  it('network-name should be qa-network@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('qa-network@0.0.1.bna');
    });
  });

  it('navbar-brand should be qa-angular-app',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('qa-angular-app');
    });
  });

  
    it('Book component should be loadable',() => {
      page.navigateTo('/Book');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Book');
      });
    });

    it('Book table should have 14 columns',() => {
      page.navigateTo('/Book');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(14); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Client component should be loadable',() => {
      page.navigateTo('/Client');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Client');
      });
    });

    it('Client table should have 4 columns',() => {
      page.navigateTo('/Client');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('QA component should be loadable',() => {
      page.navigateTo('/QA');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('QA');
      });
    });

    it('QA table should have 8 columns',() => {
      page.navigateTo('/QA');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('createBook component should be loadable',() => {
      page.navigateTo('/createBook');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('createBook');
      });
    });
  
    it('addFeedback component should be loadable',() => {
      page.navigateTo('/addFeedback');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('addFeedback');
      });
    });
  
    it('hashtag component should be loadable',() => {
      page.navigateTo('/hashtag');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('hashtag');
      });
    });
  
    it('vote_qa component should be loadable',() => {
      page.navigateTo('/vote_qa');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('vote_qa');
      });
    });
  
    it('select_feedback component should be loadable',() => {
      page.navigateTo('/select_feedback');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('select_feedback');
      });
    });
  

});