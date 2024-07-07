import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from "./plugins/router.js";

const container = document.querySelector("#root");
const root = ReactDOM.createRoot(container);
root.render(
  <RouterProvider router={router}/>
);
