import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import InviteUpdatePage from './invite-update.page-object';

const expect = chai.expect;
export class InviteDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gmsApp.invite.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-invite'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class InviteComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('invite-heading'));
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
    await navBarPage.getEntityPage('invite');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateInvite() {
    await this.createButton.click();
    return new InviteUpdatePage();
  }

  async deleteInvite() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const inviteDeleteDialog = new InviteDeleteDialog();
    await waitUntilDisplayed(inviteDeleteDialog.deleteModal);
    expect(await inviteDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gmsApp.invite.delete.question/);
    await inviteDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(inviteDeleteDialog.deleteModal);

    expect(await isVisible(inviteDeleteDialog.deleteModal)).to.be.false;
  }
}
