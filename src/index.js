import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ThemeConfig from "./constants/theme";
import { Provider } from "react-redux";
import store from "./state/store";
import 'react-toastify/dist/ReactToastify.css';
// // import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeConfig>
        <App />
      </ThemeConfig>
    </Provider>
  </React.StrictMode>
);
