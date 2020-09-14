import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import defaultStates from "./states/default-states";
import rootReducers from "./reducers/root-reducers";

import { createLogger } from 'redux-logger'
const loggerMiddleware = createLogger();

export default function configureStore() {
  return createStore(
    rootReducers,
    defaultStates,
    process.env.REACT_APP_DEBUG === 'true' ? applyMiddleware(thunkMiddleware, loggerMiddleware) : applyMiddleware(thunkMiddleware),
  )
}
