import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBaseEntity, defaultValue } from 'app/shared/model/base-entity.model';

export const ACTION_TYPES = {
  FETCH_BASEENTITY_LIST: 'baseEntity/FETCH_BASEENTITY_LIST',
  FETCH_BASEENTITY: 'baseEntity/FETCH_BASEENTITY',
  CREATE_BASEENTITY: 'baseEntity/CREATE_BASEENTITY',
  UPDATE_BASEENTITY: 'baseEntity/UPDATE_BASEENTITY',
  DELETE_BASEENTITY: 'baseEntity/DELETE_BASEENTITY',
  RESET: 'baseEntity/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBaseEntity>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type BaseEntityState = Readonly<typeof initialState>;

// Reducer

export default (state: BaseEntityState = initialState, action): BaseEntityState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BASEENTITY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BASEENTITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BASEENTITY):
    case REQUEST(ACTION_TYPES.UPDATE_BASEENTITY):
    case REQUEST(ACTION_TYPES.DELETE_BASEENTITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_BASEENTITY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BASEENTITY):
    case FAILURE(ACTION_TYPES.CREATE_BASEENTITY):
    case FAILURE(ACTION_TYPES.UPDATE_BASEENTITY):
    case FAILURE(ACTION_TYPES.DELETE_BASEENTITY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BASEENTITY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BASEENTITY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BASEENTITY):
    case SUCCESS(ACTION_TYPES.UPDATE_BASEENTITY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_BASEENTITY):
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

const apiUrl = 'api/base-entities';

// Actions

export const getEntities: ICrudGetAllAction<IBaseEntity> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BASEENTITY_LIST,
  payload: axios.get<IBaseEntity>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IBaseEntity> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BASEENTITY,
    payload: axios.get<IBaseEntity>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IBaseEntity> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BASEENTITY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBaseEntity> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BASEENTITY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBaseEntity> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BASEENTITY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
