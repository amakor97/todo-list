import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from "./plugins/router.js";
import store from './plugins/store.js';

const container = document.querySelector("#root");
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>

);
