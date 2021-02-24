import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import InviteDataComponentsPage from './invite-data.page-object';
import InviteDataUpdatePage from './invite-data-update.page-object';
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

describe('InviteData e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let inviteDataComponentsPage: InviteDataComponentsPage;
  let inviteDataUpdatePage: InviteDataUpdatePage;

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
    inviteDataComponentsPage = new InviteDataComponentsPage();
    inviteDataComponentsPage = await inviteDataComponentsPage.goToPage(navBarPage);
  });

  it('should load InviteData', async () => {
    expect(await inviteDataComponentsPage.title.getText()).to.match(/Invite Data/);
    expect(await inviteDataComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete InviteData', async () => {
    const beforeRecordsCount = (await isVisible(inviteDataComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(inviteDataComponentsPage.table);
    inviteDataUpdatePage = await inviteDataComponentsPage.goToCreateInviteData();
    await inviteDataUpdatePage.enterData();

    expect(await inviteDataComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(inviteDataComponentsPage.table);
    await waitUntilCount(inviteDataComponentsPage.records, beforeRecordsCount + 1);
    expect(await inviteDataComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await inviteDataComponentsPage.deleteInviteData();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(inviteDataComponentsPage.records, beforeRecordsCount);
      expect(await inviteDataComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(inviteDataComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
