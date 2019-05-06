import { injectable } from 'inversify';

import { startsWith, endsWith, keys, isEmpty, isObject } from 'lodash';
import { RequestMethod } from 'src/constants/RequestMethod';
import { LocalStorageKeys } from 'src/constants/LocalStorageKeys';
import { RequestErrorMessage } from 'src/constants/RequestErrorMessage';
import {
  RequestResponse,
  RequestOptions,
  RequestActionStart,
} from 'src/redux/request/requestActions';

import stores from 'src/store';
import { AUTO_RENEW_AUTHENTICATION_TOKEN, MAXIMUM_RETRY_TIMES } from 'src/config';

import AuthenticationService from './FirebaseService';
import {
  REQUEST_ACTION_START,
  REQUEST_ACTION_SUCCESS,
  REQUEST_ACTION_ERROR,
} from 'src/redux/request/requestTypes';
import { USER_ACTION_LOG_OUT } from 'src/redux/user/userTypes';

@injectable()
export default class Request {
  private originalEndpoint: string;
  private endpoint: string;
  private method: RequestMethod;
  private options: RequestOptions;
  private params: any;

  /**
   * Format Request endpoint for request
   */
  private getEndpoint(): any {
    if (endsWith(process.env.API_ENDPOINT, '/')) {
      throw new Error('Your endpoint from ENV variable should not end with `/`');
    }

    if (startsWith(this.endpoint, '/') === false) {
      throw new Error('Your request endpoint should be start with `/`');
    }

    return `${process.env.API_ENDPOINT}${this.endpoint}`;
  }

  /**
   * Format headers for request
   */
  private get headers() {
    const headers: object = this.options.headers || {};

    // Add header: Content-Type
    if (!this.options.isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    // Add header: Authorization
    if (!this.options.dontUseToken) {
      const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);

      if (accessToken) {
        headers['Authorization'] = accessToken;
      }
    }

    return headers;
  }

  private getParams(): any {
    if (isEmpty(this.params)) {
      return null;
    }

    if ([RequestMethod.GET, RequestMethod.HEAD].indexOf(this.method) > -1) {
      let urlParams = this.params;

      if (isObject(urlParams)) {
        urlParams = keys(this.params).map((key: string) => `${key}=${this.params[key]}`).join('&');
      }

      this.endpoint = `${this.originalEndpoint}?${urlParams}`;
      return;
    }

    if (this.options.isFormData) {
      return this.params;
    }

    return JSON.stringify(this.params);
  }

  private async request(retried: number = 0): Promise<RequestResponse> {
    const requestActionStart: RequestActionStart = {
      type: REQUEST_ACTION_START,
      payload: {
        showSpinner: this.options.dontShowLoading || false,
      }
    };
    stores.dispatch(requestActionStart);

    const request: any = {
      method: this.method,
      headers: this.headers,
      body: this.getParams(),
    };

    const response: RequestResponse = {
      success: false,
    };

    try {
      const fetchResponse: Response = await fetch(this.getEndpoint(), request);
      const statusCode: number = fetchResponse.status;

      // Refresh new token if token is expired
      // Then make request again
      if (statusCode === 401 && AUTO_RENEW_AUTHENTICATION_TOKEN) {
        const newToken = await AuthenticationService.renewToken();

        if (retried >= MAXIMUM_RETRY_TIMES || !newToken) {
          stores.dispatch({ type: USER_ACTION_LOG_OUT });
          throw new Error(`Could not renew token after ${retried} times`);
        }

        localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, newToken);

        return await this.request(retried + 1);
      }

      if (statusCode !== 200) {
        throw new Error(fetchResponse.statusText || RequestErrorMessage[statusCode]);
      }

      // Get json data
      const jsonData = await fetchResponse.json();
      response.data = jsonData.data;
      response.total = jsonData.total || 0;
      response.success = true;

      stores.dispatch({ type: REQUEST_ACTION_SUCCESS });

      return response;
    } catch (error) {
      stores.dispatch({ type: REQUEST_ACTION_ERROR });
      console.log('Request', error);

      response.error = error.message;
      return response;
    } finally {
      console.log('finally');
    }
  }

  public async get(endpoint: string, params: any = {}, options: RequestOptions = {}): Promise<RequestResponse> {
    this.originalEndpoint = endpoint;
    this.endpoint = endpoint;
    this.method = RequestMethod.GET;
    this.params = params;
    this.options = options;

    return await this.request();
  }

  public async post(endpoint: string, params: any = {}, options: RequestOptions = {}): Promise<RequestResponse> {
    this.originalEndpoint = endpoint;
    this.endpoint = endpoint;
    this.method = RequestMethod.POST;
    this.params = params;
    this.options = options;

    return await this.request();
  }

  public async postFormData(endpoint: string, params: any = {}, options: RequestOptions = {}): Promise<RequestResponse> {
    this.originalEndpoint = endpoint;
    this.endpoint = endpoint;
    this.method = RequestMethod.POST;
    this.params = params;
    this.options = options;

    return await this.request();
  }

  public async put(endpoint: string, params: any = {}, options: RequestOptions = {}): Promise<RequestResponse> {
    this.originalEndpoint = endpoint;
    this.endpoint = endpoint;
    this.method = RequestMethod.PUT;
    this.params = params;
    this.options = options;

    return await this.request();
  }

  public async delete(endpoint: string, params: any = {}, options: RequestOptions = {}): Promise<RequestResponse> {
    this.originalEndpoint = endpoint;
    this.endpoint = endpoint;
    this.method = RequestMethod.DELETE;
    this.params = params;
    this.options = options;

    return await this.request();
  }

  public async head(endpoint: string, params: any = {}, options: RequestOptions = {}): Promise<RequestResponse> {
    this.originalEndpoint = endpoint;
    this.endpoint = endpoint;
    this.method = RequestMethod.HEAD;
    this.params = params;
    this.options = options;

    return await this.request();
  }
}
