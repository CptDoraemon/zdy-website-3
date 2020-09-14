import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import filterTableRootReducers from "./reducers/root-reducers";

import { createLogger } from 'redux-logger'
import filterTableDefaultState from "./states/root-states";
const loggerMiddleware = createLogger();

export default function configureStore() {
  return createStore(
    filterTableRootReducers,
    filterTableDefaultState,
    process.env.REACT_APP_DEBUG === 'true' ? applyMiddleware(thunkMiddleware, loggerMiddleware) : applyMiddleware(thunkMiddleware),
  )
}
