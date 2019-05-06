import { injectable } from 'inversify';

import Firebase from './FirebaseService';
import Request from './Request';

import { LocalStorageKeys } from 'src/constants/LocalStorageKeys';
import { RequestErrorMessage } from 'src/constants/RequestErrorMessage';

import stores from 'src/store';
import { RequestResponse } from 'src/redux/request/requestActions';
import { USER_ACTION_AUTHENTICATED, USER_ACTION_LOG_OUT } from 'src/redux/user/userTypes';

export interface UserService {
  checkLogged(): void,
  login(email: string, password: string): Promise<RequestResponse>,
  logout(): Promise<RequestResponse>,
}

@injectable()
export class UserServiceImpl extends Request implements UserService {
  public async checkLogged() {
    const accessToken: string | null = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);

    if (accessToken !== null) {
      stores.dispatch({ type: USER_ACTION_AUTHENTICATED });
    }
  }

  public async login(email: string, password: string) {
    try {
      const result = await Firebase.auth.signInWithEmailAndPassword(email, password);
      const user = result.user;

      if (!user) {
        throw new Error();
      }

      // Verify role
      const userTokenResult = await user.getIdTokenResult();
      if (userTokenResult.claims.role !== 'ADMIN') {
        throw new Error(RequestErrorMessage['auth/permission-denied']);
      }

      const userId = user.uid;
      const userToken = await user.getIdToken();

      // save token and user id into localstorage
      localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, userToken);
      localStorage.setItem(LocalStorageKeys.USER_ID, userId);

      // push event to reducer
      stores.dispatch({ type: USER_ACTION_AUTHENTICATED });

      return {
        success: true,
        data: user,
      }
    } catch (e) {
      const statusCode: string = e.code || '';
      const message = RequestErrorMessage[statusCode] || e.message;

      return {
        success: false,
        error: message,
      }
    }
  }

  public async logout() {
    try {
      await Firebase.auth.signOut();

      // clear user data from localstorage
      localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
      localStorage.removeItem(LocalStorageKeys.USER_ID);

      // push event to reducer
      stores.dispatch({ type: USER_ACTION_LOG_OUT });

      return {
        success: true,
        data: {},
      }
    } catch (e) {
      return {
        success: false,
        error: e.message,
      }
    }
  }
}