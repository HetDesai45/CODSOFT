import {combineReducers, applyMiddleware} from 'redux';
import {configureStore} from "@reduxjs/toolkit"
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from '@redux-devtools/extension';
import { loadJobReducer } from './reducers/jobReducer';

const reducer1 = combineReducers({
  loadjob: loadJobReducer,
  // jobTypeAll: loadJobTypeReducer
})

let initialState = {};
const middleware = [thunk];
const store = configureStore({reducer: reducer1,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)})

export default store;