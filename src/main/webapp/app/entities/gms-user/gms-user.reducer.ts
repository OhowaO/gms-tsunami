import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IGMSUser, defaultValue } from 'app/shared/model/gms-user.model';

export const ACTION_TYPES = {
  FETCH_GMSUSER_LIST: 'gMSUser/FETCH_GMSUSER_LIST',
  FETCH_GMSUSER: 'gMSUser/FETCH_GMSUSER',
  CREATE_GMSUSER: 'gMSUser/CREATE_GMSUSER',
  UPDATE_GMSUSER: 'gMSUser/UPDATE_GMSUSER',
  DELETE_GMSUSER: 'gMSUser/DELETE_GMSUSER',
  RESET: 'gMSUser/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGMSUser>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type GMSUserState = Readonly<typeof initialState>;

// Reducer

export default (state: GMSUserState = initialState, action): GMSUserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GMSUSER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GMSUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_GMSUSER):
    case REQUEST(ACTION_TYPES.UPDATE_GMSUSER):
    case REQUEST(ACTION_TYPES.DELETE_GMSUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_GMSUSER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GMSUSER):
    case FAILURE(ACTION_TYPES.CREATE_GMSUSER):
    case FAILURE(ACTION_TYPES.UPDATE_GMSUSER):
    case FAILURE(ACTION_TYPES.DELETE_GMSUSER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_GMSUSER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_GMSUSER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_GMSUSER):
    case SUCCESS(ACTION_TYPES.UPDATE_GMSUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_GMSUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/gms-users';

// Actions

export const getEntities: ICrudGetAllAction<IGMSUser> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_GMSUSER_LIST,
  payload: axios.get<IGMSUser>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IGMSUser> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GMSUSER,
    payload: axios.get<IGMSUser>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IGMSUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GMSUSER,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGMSUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GMSUSER,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGMSUser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GMSUSER,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
