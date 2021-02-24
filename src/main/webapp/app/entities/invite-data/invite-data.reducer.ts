import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IInviteData, defaultValue } from 'app/shared/model/invite-data.model';

export const ACTION_TYPES = {
  FETCH_INVITEDATA_LIST: 'inviteData/FETCH_INVITEDATA_LIST',
  FETCH_INVITEDATA: 'inviteData/FETCH_INVITEDATA',
  CREATE_INVITEDATA: 'inviteData/CREATE_INVITEDATA',
  UPDATE_INVITEDATA: 'inviteData/UPDATE_INVITEDATA',
  DELETE_INVITEDATA: 'inviteData/DELETE_INVITEDATA',
  RESET: 'inviteData/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IInviteData>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type InviteDataState = Readonly<typeof initialState>;

// Reducer

export default (state: InviteDataState = initialState, action): InviteDataState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INVITEDATA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INVITEDATA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_INVITEDATA):
    case REQUEST(ACTION_TYPES.UPDATE_INVITEDATA):
    case REQUEST(ACTION_TYPES.DELETE_INVITEDATA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_INVITEDATA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INVITEDATA):
    case FAILURE(ACTION_TYPES.CREATE_INVITEDATA):
    case FAILURE(ACTION_TYPES.UPDATE_INVITEDATA):
    case FAILURE(ACTION_TYPES.DELETE_INVITEDATA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_INVITEDATA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_INVITEDATA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_INVITEDATA):
    case SUCCESS(ACTION_TYPES.UPDATE_INVITEDATA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_INVITEDATA):
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

const apiUrl = 'api/invite-data';

// Actions

export const getEntities: ICrudGetAllAction<IInviteData> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_INVITEDATA_LIST,
  payload: axios.get<IInviteData>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IInviteData> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INVITEDATA,
    payload: axios.get<IInviteData>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IInviteData> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INVITEDATA,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IInviteData> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INVITEDATA,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IInviteData> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INVITEDATA,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
