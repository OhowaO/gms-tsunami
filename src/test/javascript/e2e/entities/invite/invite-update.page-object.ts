import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class InviteUpdatePage {
  pageTitle: ElementFinder = element(by.id('gmsApp.invite.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  hostInput: ElementFinder = element(by.css('input#invite-host'));
  guestInput: ElementFinder = element(by.css('input#invite-guest'));
  validFromInput: ElementFinder = element(by.css('input#invite-validFrom'));
  validToInput: ElementFinder = element(by.css('input#invite-validTo'));
  inviteStatusSelect: ElementFinder = element(by.css('select#invite-inviteStatus'));
  hostSelect: ElementFinder = element(by.css('select#invite-host'));
  guestSelect: ElementFinder = element(by.css('select#invite-guest'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setHostInput(host) {
    await this.hostInput.sendKeys(host);
  }

  async getHostInput() {
    return this.hostInput.getAttribute('value');
  }

  async setGuestInput(guest) {
    await this.guestInput.sendKeys(guest);
  }

  async getGuestInput() {
    return this.guestInput.getAttribute('value');
  }

  async setValidFromInput(validFrom) {
    await this.validFromInput.sendKeys(validFrom);
  }

  async getValidFromInput() {
    return this.validFromInput.getAttribute('value');
  }

  async setValidToInput(validTo) {
    await this.validToInput.sendKeys(validTo);
  }

  async getValidToInput() {
    return this.validToInput.getAttribute('value');
  }

  async setInviteStatusSelect(inviteStatus) {
    await this.inviteStatusSelect.sendKeys(inviteStatus);
  }

  async getInviteStatusSelect() {
    return this.inviteStatusSelect.element(by.css('option:checked')).getText();
  }

  async inviteStatusSelectLastOption() {
    await this.inviteStatusSelect.all(by.tagName('option')).last().click();
  }
  async hostSelectLastOption() {
    await this.hostSelect.all(by.tagName('option')).last().click();
  }

  async hostSelectOption(option) {
    await this.hostSelect.sendKeys(option);
  }

  getHostSelect() {
    return this.hostSelect;
  }

  async getHostSelectedOption() {
    return this.hostSelect.element(by.css('option:checked')).getText();
  }

  async guestSelectLastOption() {
    await this.guestSelect.all(by.tagName('option')).last().click();
  }

  async guestSelectOption(option) {
    await this.guestSelect.sendKeys(option);
  }

  getGuestSelect() {
    return this.guestSelect;
  }

  async getGuestSelectedOption() {
    return this.guestSelect.element(by.css('option:checked')).getText();
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
    await this.setHostInput('host');
    expect(await this.getHostInput()).to.match(/host/);
    await waitUntilDisplayed(this.saveButton);
    await this.setGuestInput('guest');
    expect(await this.getGuestInput()).to.match(/guest/);
    await waitUntilDisplayed(this.saveButton);
    await this.setValidFromInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getValidFromInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setValidToInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getValidToInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.inviteStatusSelectLastOption();
    await this.hostSelectLastOption();
    await this.guestSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
