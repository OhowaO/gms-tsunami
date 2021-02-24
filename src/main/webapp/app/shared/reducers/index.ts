import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from './user-management';
// prettier-ignore
import baseEntity, {
  BaseEntityState
} from 'app/entities/base-entity/base-entity.reducer';
// prettier-ignore
import gMSUser, {
  GMSUserState
} from 'app/entities/gms-user/gms-user.reducer';
// prettier-ignore
import identificationDocument, {
  IdentificationDocumentState
} from 'app/entities/identification-document/identification-document.reducer';
// prettier-ignore
import tenant, {
  TenantState
} from 'app/entities/tenant/tenant.reducer';
// prettier-ignore
import invite, {
  InviteState
} from 'app/entities/invite/invite.reducer';
// prettier-ignore
import inviteData, {
  InviteDataState
} from 'app/entities/invite-data/invite-data.reducer';
// prettier-ignore
import residentialProperty, {
  ResidentialPropertyState
} from 'app/entities/residential-property/residential-property.reducer';
// prettier-ignore
import owner, {
  OwnerState
} from 'app/entities/owner/owner.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly baseEntity: BaseEntityState;
  readonly gMSUser: GMSUserState;
  readonly identificationDocument: IdentificationDocumentState;
  readonly tenant: TenantState;
  readonly invite: InviteState;
  readonly inviteData: InviteDataState;
  readonly residentialProperty: ResidentialPropertyState;
  readonly owner: OwnerState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  baseEntity,
  gMSUser,
  identificationDocument,
  tenant,
  invite,
  inviteData,
  residentialProperty,
  owner,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
