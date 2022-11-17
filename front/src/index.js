//React imports
import React from "react";
import ReactDOM from "react-dom/client";

//Components imports
import App from "./App";

//Router-dom imports
import { BrowserRouter } from "react-router-dom";

//Provider imports
import Providers from "./Providers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
        <Providers>
          <App />
        </Providers>
    </React.StrictMode>
  </BrowserRouter>
);
