import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import InviteComponentsPage from './invite.page-object';
import InviteUpdatePage from './invite-update.page-object';
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

describe('Invite e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let inviteComponentsPage: InviteComponentsPage;
  let inviteUpdatePage: InviteUpdatePage;

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
    inviteComponentsPage = new InviteComponentsPage();
    inviteComponentsPage = await inviteComponentsPage.goToPage(navBarPage);
  });

  it('should load Invites', async () => {
    expect(await inviteComponentsPage.title.getText()).to.match(/Invites/);
    expect(await inviteComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Invites', async () => {
    const beforeRecordsCount = (await isVisible(inviteComponentsPage.noRecords)) ? 0 : await getRecordsCount(inviteComponentsPage.table);
    inviteUpdatePage = await inviteComponentsPage.goToCreateInvite();
    await inviteUpdatePage.enterData();

    expect(await inviteComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(inviteComponentsPage.table);
    await waitUntilCount(inviteComponentsPage.records, beforeRecordsCount + 1);
    expect(await inviteComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await inviteComponentsPage.deleteInvite();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(inviteComponentsPage.records, beforeRecordsCount);
      expect(await inviteComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(inviteComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
