import { UserActions } from './userActions';
import {
  USER_ACTION_AUTHENTICATED,
  USER_ACTION_LOG_OUT,
  UserState,
} from './userTypes';

const initialState: UserState = {
  isAuthenticated: false,
};

export function userReducer(
  state: UserState = initialState,
  action: UserActions,
): UserState {
  switch (action.type) {
    case USER_ACTION_AUTHENTICATED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };

    case USER_ACTION_LOG_OUT:
      return {
        name: '',
        email: '',
        avatar: '',
        isAuthenticated: false,
      };

    default:
      return state;
  }
};