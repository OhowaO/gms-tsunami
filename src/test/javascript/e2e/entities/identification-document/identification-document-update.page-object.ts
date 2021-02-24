import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class IdentificationDocumentUpdatePage {
  pageTitle: ElementFinder = element(by.id('gmsApp.identificationDocument.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idTypeSelect: ElementFinder = element(by.css('select#identification-document-idType'));
  uniqueDocumentIDInput: ElementFinder = element(by.css('input#identification-document-uniqueDocumentID'));
  dateOfIssueInput: ElementFinder = element(by.css('input#identification-document-dateOfIssue'));
  issueingCountrySelect: ElementFinder = element(by.css('select#identification-document-issueingCountry'));
  dateOfExpiryInput: ElementFinder = element(by.css('input#identification-document-dateOfExpiry'));
  photo1Input: ElementFinder = element(by.css('input#file_photo1'));
  photo2Input: ElementFinder = element(by.css('input#file_photo2'));
  verifiedInput: ElementFinder = element(by.css('input#identification-document-verified'));
  uniqueDocumentIDSelect: ElementFinder = element(by.css('select#identification-document-uniqueDocumentID'));
  gMSUserSelect: ElementFinder = element(by.css('select#identification-document-gMSUser'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdTypeSelect(idType) {
    await this.idTypeSelect.sendKeys(idType);
  }

  async getIdTypeSelect() {
    return this.idTypeSelect.element(by.css('option:checked')).getText();
  }

  async idTypeSelectLastOption() {
    await this.idTypeSelect.all(by.tagName('option')).last().click();
  }
  async setUniqueDocumentIDInput(uniqueDocumentID) {
    await this.uniqueDocumentIDInput.sendKeys(uniqueDocumentID);
  }

  async getUniqueDocumentIDInput() {
    return this.uniqueDocumentIDInput.getAttribute('value');
  }

  async setDateOfIssueInput(dateOfIssue) {
    await this.dateOfIssueInput.sendKeys(dateOfIssue);
  }

  async getDateOfIssueInput() {
    return this.dateOfIssueInput.getAttribute('value');
  }

  async setIssueingCountrySelect(issueingCountry) {
    await this.issueingCountrySelect.sendKeys(issueingCountry);
  }

  async getIssueingCountrySelect() {
    return this.issueingCountrySelect.element(by.css('option:checked')).getText();
  }

  async issueingCountrySelectLastOption() {
    await this.issueingCountrySelect.all(by.tagName('option')).last().click();
  }
  async setDateOfExpiryInput(dateOfExpiry) {
    await this.dateOfExpiryInput.sendKeys(dateOfExpiry);
  }

  async getDateOfExpiryInput() {
    return this.dateOfExpiryInput.getAttribute('value');
  }

  async setPhoto1Input(photo1) {
    await this.photo1Input.sendKeys(photo1);
  }

  async getPhoto1Input() {
    return this.photo1Input.getAttribute('value');
  }

  async setPhoto2Input(photo2) {
    await this.photo2Input.sendKeys(photo2);
  }

  async getPhoto2Input() {
    return this.photo2Input.getAttribute('value');
  }

  getVerifiedInput() {
    return this.verifiedInput;
  }
  async uniqueDocumentIDSelectLastOption() {
    await this.uniqueDocumentIDSelect.all(by.tagName('option')).last().click();
  }

  async uniqueDocumentIDSelectOption(option) {
    await this.uniqueDocumentIDSelect.sendKeys(option);
  }

  getUniqueDocumentIDSelect() {
    return this.uniqueDocumentIDSelect;
  }

  async getUniqueDocumentIDSelectedOption() {
    return this.uniqueDocumentIDSelect.element(by.css('option:checked')).getText();
  }

  async gMSUserSelectLastOption() {
    await this.gMSUserSelect.all(by.tagName('option')).last().click();
  }

  async gMSUserSelectOption(option) {
    await this.gMSUserSelect.sendKeys(option);
  }

  getGMSUserSelect() {
    return this.gMSUserSelect;
  }

  async getGMSUserSelectedOption() {
    return this.gMSUserSelect.element(by.css('option:checked')).getText();
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
    await this.idTypeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setUniqueDocumentIDInput('uniqueDocumentID');
    expect(await this.getUniqueDocumentIDInput()).to.match(/uniqueDocumentID/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateOfIssueInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getDateOfIssueInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.issueingCountrySelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setDateOfExpiryInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getDateOfExpiryInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setPhoto1Input(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setPhoto2Input(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    const selectedVerified = await this.getVerifiedInput().isSelected();
    if (selectedVerified) {
      await this.getVerifiedInput().click();
      expect(await this.getVerifiedInput().isSelected()).to.be.false;
    } else {
      await this.getVerifiedInput().click();
      expect(await this.getVerifiedInput().isSelected()).to.be.true;
    }
    await this.uniqueDocumentIDSelectLastOption();
    await this.gMSUserSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
