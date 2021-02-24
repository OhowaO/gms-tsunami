import { Moment } from 'moment';
import { ITenant } from 'app/shared/model/tenant.model';
import { IGMSUser } from 'app/shared/model/gms-user.model';
import { IInviteData } from 'app/shared/model/invite-data.model';
import { InviteStatus } from 'app/shared/model/enumerations/invite-status.model';

export interface IInvite {
  id?: number;
  host?: string;
  guest?: string;
  validFrom?: string;
  validTo?: string;
  inviteStatus?: InviteStatus;
  host?: ITenant;
  guest?: IGMSUser;
  validFrom?: IInviteData;
  validTo?: IInviteData;
  residentialProperty?: IInviteData;
  residentialProperty?: IInviteData;
  residentialProperty?: IInviteData;
  residentialProperty?: IInviteData;
}

export const defaultValue: Readonly<IInvite> = {};
