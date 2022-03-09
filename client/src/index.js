import React from 'react';
import ReactDOM from 'react-dom';
import Router from "./router"
import { Provider } from "react-redux"
import ReduxStore from "./store"
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ReduxStore()}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

