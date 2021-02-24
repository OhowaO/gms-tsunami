import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IResidentialProperty, defaultValue } from 'app/shared/model/residential-property.model';

export const ACTION_TYPES = {
  FETCH_RESIDENTIALPROPERTY_LIST: 'residentialProperty/FETCH_RESIDENTIALPROPERTY_LIST',
  FETCH_RESIDENTIALPROPERTY: 'residentialProperty/FETCH_RESIDENTIALPROPERTY',
  CREATE_RESIDENTIALPROPERTY: 'residentialProperty/CREATE_RESIDENTIALPROPERTY',
  UPDATE_RESIDENTIALPROPERTY: 'residentialProperty/UPDATE_RESIDENTIALPROPERTY',
  DELETE_RESIDENTIALPROPERTY: 'residentialProperty/DELETE_RESIDENTIALPROPERTY',
  RESET: 'residentialProperty/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IResidentialProperty>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ResidentialPropertyState = Readonly<typeof initialState>;

// Reducer

export default (state: ResidentialPropertyState = initialState, action): ResidentialPropertyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RESIDENTIALPROPERTY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RESIDENTIALPROPERTY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_RESIDENTIALPROPERTY):
    case REQUEST(ACTION_TYPES.UPDATE_RESIDENTIALPROPERTY):
    case REQUEST(ACTION_TYPES.DELETE_RESIDENTIALPROPERTY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_RESIDENTIALPROPERTY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RESIDENTIALPROPERTY):
    case FAILURE(ACTION_TYPES.CREATE_RESIDENTIALPROPERTY):
    case FAILURE(ACTION_TYPES.UPDATE_RESIDENTIALPROPERTY):
    case FAILURE(ACTION_TYPES.DELETE_RESIDENTIALPROPERTY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESIDENTIALPROPERTY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESIDENTIALPROPERTY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_RESIDENTIALPROPERTY):
    case SUCCESS(ACTION_TYPES.UPDATE_RESIDENTIALPROPERTY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_RESIDENTIALPROPERTY):
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

const apiUrl = 'api/residential-properties';

// Actions

export const getEntities: ICrudGetAllAction<IResidentialProperty> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RESIDENTIALPROPERTY_LIST,
  payload: axios.get<IResidentialProperty>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IResidentialProperty> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RESIDENTIALPROPERTY,
    payload: axios.get<IResidentialProperty>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IResidentialProperty> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RESIDENTIALPROPERTY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IResidentialProperty> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RESIDENTIALPROPERTY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IResidentialProperty> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RESIDENTIALPROPERTY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
