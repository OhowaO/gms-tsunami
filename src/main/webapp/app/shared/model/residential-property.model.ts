import { ITenant } from 'app/shared/model/tenant.model';
import { IOwner } from 'app/shared/model/owner.model';
import { ResidentialPropertyType } from 'app/shared/model/enumerations/residential-property-type.model';
import { Countries } from 'app/shared/model/enumerations/countries.model';

export interface IResidentialProperty {
  id?: number;
  residentialPropertyID?: number;
  type?: ResidentialPropertyType;
  ownerID?: number;
  houseNumber?: string;
  block?: string;
  apartmentName?: string;
  streetName?: string;
  city?: string;
  country?: Countries;
  residentialPropertyIDS?: ITenant[];
  ownerIDS?: IOwner[];
}

export const defaultValue: Readonly<IResidentialProperty> = {};
