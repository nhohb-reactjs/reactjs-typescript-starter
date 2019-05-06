import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import './scss/index.scss';

import App from './App';
import store from './store';

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
), document.getElementById('root') as HTMLElement);

registerServiceWorker();