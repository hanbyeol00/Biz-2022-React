import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./css/index.css";
import "tw-elements";
import router from "./nav/Navigation";
import Provider from "./context/ProviderCompil";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
