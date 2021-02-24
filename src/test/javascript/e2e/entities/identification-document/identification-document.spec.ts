import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import IdentificationDocumentComponentsPage from './identification-document.page-object';
import IdentificationDocumentUpdatePage from './identification-document-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('IdentificationDocument e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let identificationDocumentComponentsPage: IdentificationDocumentComponentsPage;
  let identificationDocumentUpdatePage: IdentificationDocumentUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    identificationDocumentComponentsPage = new IdentificationDocumentComponentsPage();
    identificationDocumentComponentsPage = await identificationDocumentComponentsPage.goToPage(navBarPage);
  });

  it('should load IdentificationDocuments', async () => {
    expect(await identificationDocumentComponentsPage.title.getText()).to.match(/Identification Documents/);
    expect(await identificationDocumentComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete IdentificationDocuments', async () => {
    const beforeRecordsCount = (await isVisible(identificationDocumentComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(identificationDocumentComponentsPage.table);
    identificationDocumentUpdatePage = await identificationDocumentComponentsPage.goToCreateIdentificationDocument();
    await identificationDocumentUpdatePage.enterData();

    expect(await identificationDocumentComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(identificationDocumentComponentsPage.table);
    await waitUntilCount(identificationDocumentComponentsPage.records, beforeRecordsCount + 1);
    expect(await identificationDocumentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await identificationDocumentComponentsPage.deleteIdentificationDocument();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(identificationDocumentComponentsPage.records, beforeRecordsCount);
      expect(await identificationDocumentComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(identificationDocumentComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
