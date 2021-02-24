import { IGMSUser } from 'app/shared/model/gms-user.model';
import { IResidentialProperty } from 'app/shared/model/residential-property.model';
import { IInvite } from 'app/shared/model/invite.model';

export interface ITenant {
  id?: number;
  userID?: number;
  userID?: IGMSUser;
  userID?: IResidentialProperty;
  userID?: IInvite;
  residentialProperty?: IResidentialProperty;
}

export const defaultValue: Readonly<ITenant> = {};
