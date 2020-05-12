import React from "react";
import "./styles/global.scss";
import AuthPage from "./components/pages/AuthPage";
import HomePage from "./components/pages/HomePage";
import preStorageProcessing from "./utils/preStorageProcessing";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux"
import {globalReducer, initState} from "./reducers/globalReducer";
import initApp from "./initApp";
import Router from "./components/Router/Index";
import logger from "redux-logger"
import rootReducer from "./reducers/rootReducer";

/*const customMiddleware = store => (next) => (action) => {
    console.log(`Action type is ${action.type}, action date is ${action.payload}`);
    return next(action);
};*/

export const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(logger),
);

class App extends React.Component {
    constructor (props) {
        super(props);
        initApp(store);
  };

  render() {
    return (
        <Provider store={store}>
          <Router/>
        </Provider>
    );
  }
}
export default App;
