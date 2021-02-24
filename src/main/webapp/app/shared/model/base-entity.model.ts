import { IGMSUser } from 'app/shared/model/gms-user.model';

export interface IBaseEntity {
  id?: number;
  iD?: IGMSUser;
}

export const defaultValue: Readonly<IBaseEntity> = {};
