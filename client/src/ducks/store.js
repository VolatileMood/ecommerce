import reduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import user from './user';

const rootReducer = combineReducers({
  user,
});
// Enables redux developer tools.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Contains all redux middlewares.
const middlewares = [reduxThunk];
// Redux store.
export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
