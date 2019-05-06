import { RequestActions } from 'src/redux/request/requestActions';
import { RequestState } from 'src/redux/request/requestTypes';
import { History } from 'history';

export enum ReduxPropKeys {
  REQUEST_REDUCERS = 'requestReducer',
  REQUEST_ACTIONS = 'requestActions',
};

export interface PropsBase {
  history: History,

  [ReduxPropKeys.REQUEST_REDUCERS]?: RequestState,
  [ReduxPropKeys.REQUEST_ACTIONS]?: RequestActions,
}