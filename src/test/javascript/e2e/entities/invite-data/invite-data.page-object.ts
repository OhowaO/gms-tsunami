import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import InviteDataUpdatePage from './invite-data-update.page-object';

const expect = chai.expect;
export class InviteDataDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gmsApp.inviteData.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-inviteData'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class InviteDataComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('invite-data-heading'));
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
    await navBarPage.getEntityPage('invite-data');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateInviteData() {
    await this.createButton.click();
    return new InviteDataUpdatePage();
  }

  async deleteInviteData() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const inviteDataDeleteDialog = new InviteDataDeleteDialog();
    await waitUntilDisplayed(inviteDataDeleteDialog.deleteModal);
    expect(await inviteDataDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gmsApp.inviteData.delete.question/);
    await inviteDataDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(inviteDataDeleteDialog.deleteModal);

    expect(await isVisible(inviteDataDeleteDialog.deleteModal)).to.be.false;
  }
}
