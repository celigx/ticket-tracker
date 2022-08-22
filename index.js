import { registerRootComponent } from "expo";
import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import App from "./App";

import store from "./app/store";

const Redux = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  );
};

registerRootComponent(Redux);
