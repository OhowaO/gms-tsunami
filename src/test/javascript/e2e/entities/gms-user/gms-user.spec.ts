import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import GMSUserComponentsPage from './gms-user.page-object';
import GMSUserUpdatePage from './gms-user-update.page-object';
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

describe('GMSUser e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let gMSUserComponentsPage: GMSUserComponentsPage;
  let gMSUserUpdatePage: GMSUserUpdatePage;

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
    gMSUserComponentsPage = new GMSUserComponentsPage();
    gMSUserComponentsPage = await gMSUserComponentsPage.goToPage(navBarPage);
  });

  it('should load GMSUsers', async () => {
    expect(await gMSUserComponentsPage.title.getText()).to.match(/GMS Users/);
    expect(await gMSUserComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete GMSUsers', async () => {
    const beforeRecordsCount = (await isVisible(gMSUserComponentsPage.noRecords)) ? 0 : await getRecordsCount(gMSUserComponentsPage.table);
    gMSUserUpdatePage = await gMSUserComponentsPage.goToCreateGMSUser();
    await gMSUserUpdatePage.enterData();

    expect(await gMSUserComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(gMSUserComponentsPage.table);
    await waitUntilCount(gMSUserComponentsPage.records, beforeRecordsCount + 1);
    expect(await gMSUserComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await gMSUserComponentsPage.deleteGMSUser();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(gMSUserComponentsPage.records, beforeRecordsCount);
      expect(await gMSUserComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(gMSUserComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
