import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ResidentialPropertyUpdatePage {
  pageTitle: ElementFinder = element(by.id('gmsApp.residentialProperty.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  residentialPropertyIDInput: ElementFinder = element(by.css('input#residential-property-residentialPropertyID'));
  typeSelect: ElementFinder = element(by.css('select#residential-property-type'));
  ownerIDInput: ElementFinder = element(by.css('input#residential-property-ownerID'));
  houseNumberInput: ElementFinder = element(by.css('input#residential-property-houseNumber'));
  blockInput: ElementFinder = element(by.css('input#residential-property-block'));
  apartmentNameInput: ElementFinder = element(by.css('input#residential-property-apartmentName'));
  streetNameInput: ElementFinder = element(by.css('input#residential-property-streetName'));
  cityInput: ElementFinder = element(by.css('input#residential-property-city'));
  countrySelect: ElementFinder = element(by.css('select#residential-property-country'));
  ownerIDSelect: ElementFinder = element(by.css('select#residential-property-ownerID'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setResidentialPropertyIDInput(residentialPropertyID) {
    await this.residentialPropertyIDInput.sendKeys(residentialPropertyID);
  }

  async getResidentialPropertyIDInput() {
    return this.residentialPropertyIDInput.getAttribute('value');
  }

  async setTypeSelect(type) {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect() {
    return this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption() {
    await this.typeSelect.all(by.tagName('option')).last().click();
  }
  async setOwnerIDInput(ownerID) {
    await this.ownerIDInput.sendKeys(ownerID);
  }

  async getOwnerIDInput() {
    return this.ownerIDInput.getAttribute('value');
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

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return this.cityInput.getAttribute('value');
  }

  async setCountrySelect(country) {
    await this.countrySelect.sendKeys(country);
  }

  async getCountrySelect() {
    return this.countrySelect.element(by.css('option:checked')).getText();
  }

  async countrySelectLastOption() {
    await this.countrySelect.all(by.tagName('option')).last().click();
  }
  async ownerIDSelectLastOption() {
    await this.ownerIDSelect.all(by.tagName('option')).last().click();
  }

  async ownerIDSelectOption(option) {
    await this.ownerIDSelect.sendKeys(option);
  }

  getOwnerIDSelect() {
    return this.ownerIDSelect;
  }

  async getOwnerIDSelectedOption() {
    return this.ownerIDSelect.element(by.css('option:checked')).getText();
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
    await this.setResidentialPropertyIDInput('5');
    expect(await this.getResidentialPropertyIDInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.typeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setOwnerIDInput('5');
    expect(await this.getOwnerIDInput()).to.eq('5');
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
    await waitUntilDisplayed(this.saveButton);
    await this.setCityInput('city');
    expect(await this.getCityInput()).to.match(/city/);
    await waitUntilDisplayed(this.saveButton);
    await this.countrySelectLastOption();
    // this.ownerIDSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
