import { ReduxPropKeys } from './PropsBase';
import { RequestState } from 'src/redux/request/requestTypes';

export interface StoreState {
  [ReduxPropKeys.REQUEST_REDUCERS]: RequestState,
}