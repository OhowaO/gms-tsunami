import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IIdentificationDocument, defaultValue } from 'app/shared/model/identification-document.model';

export const ACTION_TYPES = {
  FETCH_IDENTIFICATIONDOCUMENT_LIST: 'identificationDocument/FETCH_IDENTIFICATIONDOCUMENT_LIST',
  FETCH_IDENTIFICATIONDOCUMENT: 'identificationDocument/FETCH_IDENTIFICATIONDOCUMENT',
  CREATE_IDENTIFICATIONDOCUMENT: 'identificationDocument/CREATE_IDENTIFICATIONDOCUMENT',
  UPDATE_IDENTIFICATIONDOCUMENT: 'identificationDocument/UPDATE_IDENTIFICATIONDOCUMENT',
  DELETE_IDENTIFICATIONDOCUMENT: 'identificationDocument/DELETE_IDENTIFICATIONDOCUMENT',
  SET_BLOB: 'identificationDocument/SET_BLOB',
  RESET: 'identificationDocument/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IIdentificationDocument>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type IdentificationDocumentState = Readonly<typeof initialState>;

// Reducer

export default (state: IdentificationDocumentState = initialState, action): IdentificationDocumentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_IDENTIFICATIONDOCUMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_IDENTIFICATIONDOCUMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_IDENTIFICATIONDOCUMENT):
    case REQUEST(ACTION_TYPES.UPDATE_IDENTIFICATIONDOCUMENT):
    case REQUEST(ACTION_TYPES.DELETE_IDENTIFICATIONDOCUMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_IDENTIFICATIONDOCUMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_IDENTIFICATIONDOCUMENT):
    case FAILURE(ACTION_TYPES.CREATE_IDENTIFICATIONDOCUMENT):
    case FAILURE(ACTION_TYPES.UPDATE_IDENTIFICATIONDOCUMENT):
    case FAILURE(ACTION_TYPES.DELETE_IDENTIFICATIONDOCUMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_IDENTIFICATIONDOCUMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_IDENTIFICATIONDOCUMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_IDENTIFICATIONDOCUMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_IDENTIFICATIONDOCUMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_IDENTIFICATIONDOCUMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/identification-documents';

// Actions

export const getEntities: ICrudGetAllAction<IIdentificationDocument> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_IDENTIFICATIONDOCUMENT_LIST,
  payload: axios.get<IIdentificationDocument>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IIdentificationDocument> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_IDENTIFICATIONDOCUMENT,
    payload: axios.get<IIdentificationDocument>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IIdentificationDocument> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_IDENTIFICATIONDOCUMENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IIdentificationDocument> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_IDENTIFICATIONDOCUMENT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IIdentificationDocument> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_IDENTIFICATIONDOCUMENT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
