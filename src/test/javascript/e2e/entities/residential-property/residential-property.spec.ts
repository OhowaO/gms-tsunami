import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ResidentialPropertyComponentsPage from './residential-property.page-object';
import ResidentialPropertyUpdatePage from './residential-property-update.page-object';
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

describe('ResidentialProperty e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let residentialPropertyComponentsPage: ResidentialPropertyComponentsPage;
  let residentialPropertyUpdatePage: ResidentialPropertyUpdatePage;

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
    residentialPropertyComponentsPage = new ResidentialPropertyComponentsPage();
    residentialPropertyComponentsPage = await residentialPropertyComponentsPage.goToPage(navBarPage);
  });

  it('should load ResidentialProperties', async () => {
    expect(await residentialPropertyComponentsPage.title.getText()).to.match(/Residential Properties/);
    expect(await residentialPropertyComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ResidentialProperties', async () => {
    const beforeRecordsCount = (await isVisible(residentialPropertyComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(residentialPropertyComponentsPage.table);
    residentialPropertyUpdatePage = await residentialPropertyComponentsPage.goToCreateResidentialProperty();
    await residentialPropertyUpdatePage.enterData();

    expect(await residentialPropertyComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(residentialPropertyComponentsPage.table);
    await waitUntilCount(residentialPropertyComponentsPage.records, beforeRecordsCount + 1);
    expect(await residentialPropertyComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await residentialPropertyComponentsPage.deleteResidentialProperty();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(residentialPropertyComponentsPage.records, beforeRecordsCount);
      expect(await residentialPropertyComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(residentialPropertyComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
