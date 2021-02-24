import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BaseEntityComponentsPage from './base-entity.page-object';
import BaseEntityUpdatePage from './base-entity-update.page-object';
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

describe('BaseEntity e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let baseEntityComponentsPage: BaseEntityComponentsPage;
  let baseEntityUpdatePage: BaseEntityUpdatePage;

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
    baseEntityComponentsPage = new BaseEntityComponentsPage();
    baseEntityComponentsPage = await baseEntityComponentsPage.goToPage(navBarPage);
  });

  it('should load BaseEntities', async () => {
    expect(await baseEntityComponentsPage.title.getText()).to.match(/Base Entities/);
    expect(await baseEntityComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete BaseEntities', async () => {
    const beforeRecordsCount = (await isVisible(baseEntityComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(baseEntityComponentsPage.table);
    baseEntityUpdatePage = await baseEntityComponentsPage.goToCreateBaseEntity();
    await baseEntityUpdatePage.enterData();

    expect(await baseEntityComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(baseEntityComponentsPage.table);
    await waitUntilCount(baseEntityComponentsPage.records, beforeRecordsCount + 1);
    expect(await baseEntityComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await baseEntityComponentsPage.deleteBaseEntity();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(baseEntityComponentsPage.records, beforeRecordsCount);
      expect(await baseEntityComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(baseEntityComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
