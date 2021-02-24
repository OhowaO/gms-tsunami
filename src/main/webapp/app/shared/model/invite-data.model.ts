import { Moment } from 'moment';
import { IInvite } from 'app/shared/model/invite.model';
import { ResidentialPropertyType } from 'app/shared/model/enumerations/residential-property-type.model';

export interface IInviteData {
  id?: number;
  start?: string;
  stop?: string;
  propertyType?: ResidentialPropertyType;
  houseNumber?: string;
  block?: string;
  apartmentName?: string;
  streetName?: string;
  start?: IInvite;
  stop?: IInvite;
  houseNumber?: IInvite;
  block?: IInvite;
  apartmentName?: IInvite;
  streetName?: IInvite;
}

export const defaultValue: Readonly<IInviteData> = {};
