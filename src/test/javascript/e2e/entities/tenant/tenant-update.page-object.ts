import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class TenantUpdatePage {
  pageTitle: ElementFinder = element(by.id('gmsApp.tenant.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userIDInput: ElementFinder = element(by.css('input#tenant-userID'));
  userIDSelect: ElementFinder = element(by.css('select#tenant-userID'));
  userIDSelect: ElementFinder = element(by.css('select#tenant-userID'));
  residentialPropertySelect: ElementFinder = element(by.css('select#tenant-residentialProperty'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUserIDInput(userID) {
    await this.userIDInput.sendKeys(userID);
  }

  async getUserIDInput() {
    return this.userIDInput.getAttribute('value');
  }

  async userIDSelectLastOption() {
    await this.userIDSelect.all(by.tagName('option')).last().click();
  }

  async userIDSelectOption(option) {
    await this.userIDSelect.sendKeys(option);
  }

  getUserIDSelect() {
    return this.userIDSelect;
  }

  async getUserIDSelectedOption() {
    return this.userIDSelect.element(by.css('option:checked')).getText();
  }

  async userIDSelectLastOption() {
    await this.userIDSelect.all(by.tagName('option')).last().click();
  }

  async userIDSelectOption(option) {
    await this.userIDSelect.sendKeys(option);
  }

  getUserIDSelect() {
    return this.userIDSelect;
  }

  async getUserIDSelectedOption() {
    return this.userIDSelect.element(by.css('option:checked')).getText();
  }

  async residentialPropertySelectLastOption() {
    await this.residentialPropertySelect.all(by.tagName('option')).last().click();
  }

  async residentialPropertySelectOption(option) {
    await this.residentialPropertySelect.sendKeys(option);
  }

  getResidentialPropertySelect() {
    return this.residentialPropertySelect;
  }

  async getResidentialPropertySelectedOption() {
    return this.residentialPropertySelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setUserIDInput('5');
    expect(await this.getUserIDInput()).to.eq('5');
    await this.userIDSelectLastOption();
    await this.userIDSelectLastOption();
    await this.residentialPropertySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
