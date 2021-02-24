import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class InviteDataUpdatePage {
  pageTitle: ElementFinder = element(by.id('gmsApp.inviteData.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  startInput: ElementFinder = element(by.css('input#invite-data-start'));
  stopInput: ElementFinder = element(by.css('input#invite-data-stop'));
  propertyTypeSelect: ElementFinder = element(by.css('select#invite-data-propertyType'));
  houseNumberInput: ElementFinder = element(by.css('input#invite-data-houseNumber'));
  blockInput: ElementFinder = element(by.css('input#invite-data-block'));
  apartmentNameInput: ElementFinder = element(by.css('input#invite-data-apartmentName'));
  streetNameInput: ElementFinder = element(by.css('input#invite-data-streetName'));
  startSelect: ElementFinder = element(by.css('select#invite-data-start'));
  stopSelect: ElementFinder = element(by.css('select#invite-data-stop'));
  houseNumberSelect: ElementFinder = element(by.css('select#invite-data-houseNumber'));
  blockSelect: ElementFinder = element(by.css('select#invite-data-block'));
  apartmentNameSelect: ElementFinder = element(by.css('select#invite-data-apartmentName'));
  streetNameSelect: ElementFinder = element(by.css('select#invite-data-streetName'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setStartInput(start) {
    await this.startInput.sendKeys(start);
  }

  async getStartInput() {
    return this.startInput.getAttribute('value');
  }

  async setStopInput(stop) {
    await this.stopInput.sendKeys(stop);
  }

  async getStopInput() {
    return this.stopInput.getAttribute('value');
  }

  async setPropertyTypeSelect(propertyType) {
    await this.propertyTypeSelect.sendKeys(propertyType);
  }

  async getPropertyTypeSelect() {
    return this.propertyTypeSelect.element(by.css('option:checked')).getText();
  }

  async propertyTypeSelectLastOption() {
    await this.propertyTypeSelect.all(by.tagName('option')).last().click();
  }
  async setHouseNumberInput(houseNumber) {
    await this.houseNumberInput.sendKeys(houseNumber);
  }

  async getHouseNumberInput() {
    return this.houseNumberInput.getAttribute('value');
  }

  async setBlockInput(block) {
    await this.blockInput.sendKeys(block);
  }

  async getBlockInput() {
    return this.blockInput.getAttribute('value');
  }

  async setApartmentNameInput(apartmentName) {
    await this.apartmentNameInput.sendKeys(apartmentName);
  }

  async getApartmentNameInput() {
    return this.apartmentNameInput.getAttribute('value');
  }

  async setStreetNameInput(streetName) {
    await this.streetNameInput.sendKeys(streetName);
  }

  async getStreetNameInput() {
    return this.streetNameInput.getAttribute('value');
  }

  async startSelectLastOption() {
    await this.startSelect.all(by.tagName('option')).last().click();
  }

  async startSelectOption(option) {
    await this.startSelect.sendKeys(option);
  }

  getStartSelect() {
    return this.startSelect;
  }

  async getStartSelectedOption() {
    return this.startSelect.element(by.css('option:checked')).getText();
  }

  async stopSelectLastOption() {
    await this.stopSelect.all(by.tagName('option')).last().click();
  }

  async stopSelectOption(option) {
    await this.stopSelect.sendKeys(option);
  }

  getStopSelect() {
    return this.stopSelect;
  }

  async getStopSelectedOption() {
    return this.stopSelect.element(by.css('option:checked')).getText();
  }

  async houseNumberSelectLastOption() {
    await this.houseNumberSelect.all(by.tagName('option')).last().click();
  }

  async houseNumberSelectOption(option) {
    await this.houseNumberSelect.sendKeys(option);
  }

  getHouseNumberSelect() {
    return this.houseNumberSelect;
  }

  async getHouseNumberSelectedOption() {
    return this.houseNumberSelect.element(by.css('option:checked')).getText();
  }

  async blockSelectLastOption() {
    await this.blockSelect.all(by.tagName('option')).last().click();
  }

  async blockSelectOption(option) {
    await this.blockSelect.sendKeys(option);
  }

  getBlockSelect() {
    return this.blockSelect;
  }

  async getBlockSelectedOption() {
    return this.blockSelect.element(by.css('option:checked')).getText();
  }

  async apartmentNameSelectLastOption() {
    await this.apartmentNameSelect.all(by.tagName('option')).last().click();
  }

  async apartmentNameSelectOption(option) {
    await this.apartmentNameSelect.sendKeys(option);
  }

  getApartmentNameSelect() {
    return this.apartmentNameSelect;
  }

  async getApartmentNameSelectedOption() {
    return this.apartmentNameSelect.element(by.css('option:checked')).getText();
  }

  async streetNameSelectLastOption() {
    await this.streetNameSelect.all(by.tagName('option')).last().click();
  }

  async streetNameSelectOption(option) {
    await this.streetNameSelect.sendKeys(option);
  }

  getStreetNameSelect() {
    return this.streetNameSelect;
  }

  async getStreetNameSelectedOption() {
    return this.streetNameSelect.element(by.css('option:checked')).getText();
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
    await this.setStartInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getStartInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setStopInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getStopInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.propertyTypeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setHouseNumberInput('houseNumber');
    expect(await this.getHouseNumberInput()).to.match(/houseNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setBlockInput('block');
    expect(await this.getBlockInput()).to.match(/block/);
    await waitUntilDisplayed(this.saveButton);
    await this.setApartmentNameInput('apartmentName');
    expect(await this.getApartmentNameInput()).to.match(/apartmentName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStreetNameInput('streetName');
    expect(await this.getStreetNameInput()).to.match(/streetName/);
    await this.startSelectLastOption();
    await this.stopSelectLastOption();
    await this.houseNumberSelectLastOption();
    await this.blockSelectLastOption();
    await this.apartmentNameSelectLastOption();
    await this.streetNameSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
