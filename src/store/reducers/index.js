import { combineReducers } from '@reduxjs/toolkit';
import gameReducer from './gameSlice.js';
import authReducer from './auth.js';
import loadReducer from './load.js';
import modalReducer from './modal.js';

const reducer = combineReducers({
  games: gameReducer,
  auth: authReducer,
  load: loadReducer,
  modal: modalReducer,
});

export default reducer;