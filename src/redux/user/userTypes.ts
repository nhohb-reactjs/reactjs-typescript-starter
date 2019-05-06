export const USER_ACTION_AUTHENTICATED = 'USER_ACTION_AUTHENTICATED';
export const USER_ACTION_LOG_OUT = 'USER_ACTION_LOG_OUT';

export interface UserState {
  isAuthenticated: boolean,
  name?: string,
  email?: string,
  avatar?: string,
  type?: string,
}