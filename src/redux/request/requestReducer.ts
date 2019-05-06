import { RequestActions, } from './requestActions';
import {
  REQUEST_ACTION_START,
  REQUEST_ACTION_SUCCESS,
  REQUEST_ACTION_ERROR,
  RequestState,
} from './requestTypes';

const initialState: RequestState = {
  isLoading: false,
  showSpinner: true,
};

export function requestReducer(
  state: RequestState = initialState,
  action: RequestActions,
): RequestState {
  switch (action.type) {
    case REQUEST_ACTION_START:
      return {
        ...state,
        ...action.payload,
        isLoading: true,
      };

    case REQUEST_ACTION_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };

    case REQUEST_ACTION_ERROR:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};
