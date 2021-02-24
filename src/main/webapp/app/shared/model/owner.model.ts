import { IGMSUser } from 'app/shared/model/gms-user.model';
import { IResidentialProperty } from 'app/shared/model/residential-property.model';

export interface IOwner {
  id?: number;
  userID?: number;
  userID?: IGMSUser;
  ownerIDS?: IResidentialProperty[];
}

export const defaultValue: Readonly<IOwner> = {};
