import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainRouterProvider from "./layout/MainRouter";
import { FirebaseContextProvider } from "./provider/firebaseProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirebaseContextProvider>
      <MainRouterProvider />
    </FirebaseContextProvider>
  </React.StrictMode>
);
