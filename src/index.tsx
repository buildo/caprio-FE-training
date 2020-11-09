import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "./setup/polyfills";

import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { IntlProvider } from "./util/intl";
import { loadLocale } from "./setup/loadLocale";
import "./setup/addDeviceClassName";

import "./theme";

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider loadLocale={loadLocale} locale="it">
      <App />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
