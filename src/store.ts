import { createStore, combineReducers } from 'redux';
import { StoreState } from './types/StoreState';

import * as reducers from './redux/reducers';

const appReducer = combineReducers<StoreState>({
  ...reducers
});

export default createStore(appReducer);