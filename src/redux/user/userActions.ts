import { Action } from 'redux';
import {
  USER_ACTION_AUTHENTICATED,
  USER_ACTION_LOG_OUT,
  UserState,
} from './userTypes';

interface UserAction extends Action {
  payload: UserState,
}

export interface UserActionAuthenticated extends UserAction {
  type: typeof USER_ACTION_AUTHENTICATED,
}

export interface UserActionLogOut extends UserAction {
  type: typeof USER_ACTION_LOG_OUT,
}

export type UserActions = UserActionAuthenticated | UserActionLogOut;
