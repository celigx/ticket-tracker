import { registerRootComponent } from "expo";
import React from "react";
import { Provider } from "react-redux";
import App from "./App";

import store from "./app/store";

const Redux = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

registerRootComponent(Redux);
