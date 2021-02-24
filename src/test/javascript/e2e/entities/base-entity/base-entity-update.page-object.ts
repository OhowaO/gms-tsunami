import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BaseEntityUpdatePage {
  pageTitle: ElementFinder = element(by.id('gmsApp.baseEntity.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  iDSelect: ElementFinder = element(by.css('select#base-entity-iD'));

  getPageTitle() {
    return this.pageTitle;
  }

  async iDSelectLastOption() {
    await this.iDSelect.all(by.tagName('option')).last().click();
  }

  async iDSelectOption(option) {
    await this.iDSelect.sendKeys(option);
  }

  getIDSelect() {
    return this.iDSelect;
  }

  async getIDSelectedOption() {
    return this.iDSelect.element(by.css('option:checked')).getText();
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
    await this.iDSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
