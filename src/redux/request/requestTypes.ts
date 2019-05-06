export const REQUEST_ACTION_START = 'REQUEST_ACTION_START';
export const REQUEST_ACTION_SUCCESS = 'REQUEST_ACTION_SUCCESS';
export const REQUEST_ACTION_ERROR = 'REQUEST_ACTION_ERROR';

export interface RequestState {
  isLoading?: boolean,
  showSpinner?: boolean,
  errorCode?: number,
  errorMessage?: string,
}