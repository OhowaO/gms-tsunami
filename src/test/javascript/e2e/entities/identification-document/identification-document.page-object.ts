import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import IdentificationDocumentUpdatePage from './identification-document-update.page-object';

const expect = chai.expect;
export class IdentificationDocumentDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gmsApp.identificationDocument.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-identificationDocument'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class IdentificationDocumentComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('identification-document-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('identification-document');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateIdentificationDocument() {
    await this.createButton.click();
    return new IdentificationDocumentUpdatePage();
  }

  async deleteIdentificationDocument() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const identificationDocumentDeleteDialog = new IdentificationDocumentDeleteDialog();
    await waitUntilDisplayed(identificationDocumentDeleteDialog.deleteModal);
    expect(await identificationDocumentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /gmsApp.identificationDocument.delete.question/
    );
    await identificationDocumentDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(identificationDocumentDeleteDialog.deleteModal);

    expect(await isVisible(identificationDocumentDeleteDialog.deleteModal)).to.be.false;
  }
}
