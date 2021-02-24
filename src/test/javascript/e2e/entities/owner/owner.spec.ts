import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OwnerComponentsPage from './owner.page-object';
import OwnerUpdatePage from './owner-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Owner e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ownerComponentsPage: OwnerComponentsPage;
  let ownerUpdatePage: OwnerUpdatePage;

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
    ownerComponentsPage = new OwnerComponentsPage();
    ownerComponentsPage = await ownerComponentsPage.goToPage(navBarPage);
  });

  it('should load Owners', async () => {
    expect(await ownerComponentsPage.title.getText()).to.match(/Owners/);
    expect(await ownerComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Owners', async () => {
    const beforeRecordsCount = (await isVisible(ownerComponentsPage.noRecords)) ? 0 : await getRecordsCount(ownerComponentsPage.table);
    ownerUpdatePage = await ownerComponentsPage.goToCreateOwner();
    await ownerUpdatePage.enterData();

    expect(await ownerComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(ownerComponentsPage.table);
    await waitUntilCount(ownerComponentsPage.records, beforeRecordsCount + 1);
    expect(await ownerComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await ownerComponentsPage.deleteOwner();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(ownerComponentsPage.records, beforeRecordsCount);
      expect(await ownerComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(ownerComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
