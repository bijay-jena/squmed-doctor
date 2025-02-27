import {createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  loggedIn: false,
  userDetail: {},
  token: '',
  selectedFacility: {},
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount(state, action) {
      state.userDetail = action.payload.userDetail;
      state.token = action.payload.token;
      state.loggedIn = action.payload.loggedIn;
    },
    setAccountData(state, action) {
      state.userDetail = action.payload.userDetail;
    },
    setLoggedIn(state, action) {
      state.loggedIn = action.payload.loggedIn;
    },
    setToken(state, action) {
      state.token = action.payload.token;
    },
    setSelectedFacility(state, action) {
      state.selectedFacility = action.payload;
    },
    resetAccount(state) {
      Object.assign(state, initialState);
    },
  },
});

const persistConfig = {
  key: 'account',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, accountSlice.reducer);

export {persistedReducer as accountReducer};

export const {
  setAccount,
  setAccountData,
  setToken,
  setLoggedIn,
  resetAccount,
  setSelectedFacility,
} = accountSlice.actions;
