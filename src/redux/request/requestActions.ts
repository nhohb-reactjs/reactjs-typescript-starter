import { Action } from 'redux';
import {
  REQUEST_ACTION_START,
  REQUEST_ACTION_SUCCESS,
  REQUEST_ACTION_ERROR,
  RequestState,
} from './requestTypes';

interface RequestAction extends Action {
  payload: RequestState,
}

export interface RequestActionStart extends RequestAction {
  type: typeof REQUEST_ACTION_START,
}

export interface RequestActionSuccess extends RequestAction {
  type: typeof REQUEST_ACTION_SUCCESS,
}

export interface RequestActionError extends RequestAction {
  type: typeof REQUEST_ACTION_ERROR,
}

export type RequestActions = RequestActionStart | RequestActionSuccess | RequestActionError;

export interface RequestOptions {
  isFormData?: boolean,
  headers?: object,
  dontUseToken?: boolean,
  dontShowLoading?: boolean,
}

export interface RequestResponse {
  success: boolean,
  data?: any,
  total?: number,
  error?: any,
}