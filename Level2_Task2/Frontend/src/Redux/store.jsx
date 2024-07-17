import {combineReducers, applyMiddleware} from 'redux';
import {configureStore} from "@reduxjs/toolkit"
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from '@redux-devtools/extension';
import { loadAdminJobReducer, loadJobReducer, loadJobSingleReducer } from './reducers/jobReducer';
import { loadJobTypeReducer } from './reducers/jobTypeReducer';
import { allUserReducer, userApplyJobReducer, userReducerLogout, userReducerProfile, userReducerSignIn, userReducerSignUp } from './reducers/userReducer';

const reducer1 = combineReducers({
  loadjob: loadJobReducer,
  jobTypeAll: loadJobTypeReducer,
  signIn: userReducerSignIn,
  signUp: userReducerSignUp,
  logOut: userReducerLogout,
  userProfile: userReducerProfile,
  singleJob: loadJobSingleReducer,
  userJobApplication: userApplyJobReducer,
  allUsers: allUserReducer,
  loadAdminJob: loadAdminJobReducer
})

const middleware = [thunk];
const store = configureStore({reducer: reducer1,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)})

export default store;