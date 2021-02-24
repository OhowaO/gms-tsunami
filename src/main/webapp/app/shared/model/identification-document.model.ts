import { Moment } from 'moment';
import { IGMSUser } from 'app/shared/model/gms-user.model';
import { IDType } from 'app/shared/model/enumerations/id-type.model';
import { Countries } from 'app/shared/model/enumerations/countries.model';

export interface IIdentificationDocument {
  id?: number;
  idType?: IDType;
  uniqueDocumentID?: string;
  dateOfIssue?: string;
  issueingCountry?: Countries;
  dateOfExpiry?: string;
  photo1ContentType?: string;
  photo1?: any;
  photo2ContentType?: string;
  photo2?: any;
  verified?: boolean;
  uniqueDocumentID?: IGMSUser;
  gMSUser?: IGMSUser;
}

export const defaultValue: Readonly<IIdentificationDocument> = {
  verified: false,
};
