import {combineReducers, applyMiddleware} from 'redux';
import {configureStore} from "@reduxjs/toolkit"
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from '@redux-devtools/extension';
import { deleteJobReducer, loadAdminJobReducer, loadJobReducer, loadJobSingleReducer, registerAjobReducer, updateJobReducer } from './reducers/jobReducer';
import { createJobTypeReducer, deleteJobTypeReducer, loadJobTypeReducer } from './reducers/jobTypeReducer';
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
  loadAdminJob: loadAdminJobReducer,
  registerJob: registerAjobReducer,
  deleteJob: deleteJobReducer,
  deleteJobType: deleteJobTypeReducer,
  createJobType: createJobTypeReducer,
  updateJob: updateJobReducer
})

const middleware = [thunk];
const store = configureStore({reducer: reducer1,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)})

export default store;