import { Moment } from 'moment';
import { IIdentificationDocument } from 'app/shared/model/identification-document.model';
import { IBaseEntity } from 'app/shared/model/base-entity.model';
import { ITenant } from 'app/shared/model/tenant.model';
import { IOwner } from 'app/shared/model/owner.model';
import { IInvite } from 'app/shared/model/invite.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface IGMSUser {
  id?: number;
  userID?: number;
  firstNames?: string;
  lastName?: string;
  gender?: Gender;
  emailAdress?: string;
  telephoneNumber?: string;
  dateOfBirth?: string;
  userIDS?: IIdentificationDocument[];
  userID?: IBaseEntity;
  userID?: ITenant;
  userID?: IOwner;
  userID?: IInvite;
}

export const defaultValue: Readonly<IGMSUser> = {};
