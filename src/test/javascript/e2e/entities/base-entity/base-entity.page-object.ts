import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BaseEntityUpdatePage from './base-entity-update.page-object';

const expect = chai.expect;
export class BaseEntityDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gmsApp.baseEntity.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-baseEntity'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BaseEntityComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('base-entity-heading'));
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
    await navBarPage.getEntityPage('base-entity');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBaseEntity() {
    await this.createButton.click();
    return new BaseEntityUpdatePage();
  }

  async deleteBaseEntity() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const baseEntityDeleteDialog = new BaseEntityDeleteDialog();
    await waitUntilDisplayed(baseEntityDeleteDialog.deleteModal);
    expect(await baseEntityDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gmsApp.baseEntity.delete.question/);
    await baseEntityDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(baseEntityDeleteDialog.deleteModal);

    expect(await isVisible(baseEntityDeleteDialog.deleteModal)).to.be.false;
  }
}
