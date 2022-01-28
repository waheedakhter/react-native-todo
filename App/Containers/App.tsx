import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { Provider } from "react-redux";

import "../Config";
import createStore from "../Reducers";
import RootContainer from "./RootContainer";

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading
 */

class App extends React.Component {
  public state = {};
  public async componentDidMount() {
    const store = await createStore();
    this.setState({ store });
  }

  public render() {
    if (this.state.store) {
      return (
        <NavigationContainer>
          <Provider store={this.state.store}>
            <RootContainer />
          </Provider>
        </NavigationContainer>
      );
    } else {
      return null;
    }
  }
}

export default App;
