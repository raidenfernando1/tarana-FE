import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import Entry from "./Entry";
import "./index.css";
import { Provider } from "jotai";
import { PopupStore } from "./store/PopupAtom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Provider store={PopupStore}>
        <Entry />
      </Provider>
    </HashRouter>
  </StrictMode>
);
