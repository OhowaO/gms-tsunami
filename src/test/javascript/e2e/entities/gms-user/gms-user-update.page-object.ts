import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class GMSUserUpdatePage {
  pageTitle: ElementFinder = element(by.id('gmsApp.gMSUser.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userIDInput: ElementFinder = element(by.css('input#gms-user-userID'));
  firstNamesInput: ElementFinder = element(by.css('input#gms-user-firstNames'));
  lastNameInput: ElementFinder = element(by.css('input#gms-user-lastName'));
  genderSelect: ElementFinder = element(by.css('select#gms-user-gender'));
  emailAdressInput: ElementFinder = element(by.css('input#gms-user-emailAdress'));
  telephoneNumberInput: ElementFinder = element(by.css('input#gms-user-telephoneNumber'));
  dateOfBirthInput: ElementFinder = element(by.css('input#gms-user-dateOfBirth'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUserIDInput(userID) {
    await this.userIDInput.sendKeys(userID);
  }

  async getUserIDInput() {
    return this.userIDInput.getAttribute('value');
  }

  async setFirstNamesInput(firstNames) {
    await this.firstNamesInput.sendKeys(firstNames);
  }

  async getFirstNamesInput() {
    return this.firstNamesInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setGenderSelect(gender) {
    await this.genderSelect.sendKeys(gender);
  }

  async getGenderSelect() {
    return this.genderSelect.element(by.css('option:checked')).getText();
  }

  async genderSelectLastOption() {
    await this.genderSelect.all(by.tagName('option')).last().click();
  }
  async setEmailAdressInput(emailAdress) {
    await this.emailAdressInput.sendKeys(emailAdress);
  }

  async getEmailAdressInput() {
    return this.emailAdressInput.getAttribute('value');
  }

  async setTelephoneNumberInput(telephoneNumber) {
    await this.telephoneNumberInput.sendKeys(telephoneNumber);
  }

  async getTelephoneNumberInput() {
    return this.telephoneNumberInput.getAttribute('value');
  }

  async setDateOfBirthInput(dateOfBirth) {
    await this.dateOfBirthInput.sendKeys(dateOfBirth);
  }

  async getDateOfBirthInput() {
    return this.dateOfBirthInput.getAttribute('value');
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
    await waitUntilDisplayed(this.saveButton);
    await this.setFirstNamesInput('firstNames');
    expect(await this.getFirstNamesInput()).to.match(/firstNames/);
    await waitUntilDisplayed(this.saveButton);
    await this.setLastNameInput('lastName');
    expect(await this.getLastNameInput()).to.match(/lastName/);
    await waitUntilDisplayed(this.saveButton);
    await this.genderSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setEmailAdressInput('emailAdress');
    expect(await this.getEmailAdressInput()).to.match(/emailAdress/);
    await waitUntilDisplayed(this.saveButton);
    await this.setTelephoneNumberInput('telephoneNumber');
    expect(await this.getTelephoneNumberInput()).to.match(/telephoneNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateOfBirthInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getDateOfBirthInput()).to.contain('2001-01-01T02:30');
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
