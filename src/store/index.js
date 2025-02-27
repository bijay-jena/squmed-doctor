import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import {accountReducer} from './accountSlice'; // Use the persisted reducer
// import { currentLocationSlice } from "./currentLocation";
// import { doctorVisitSlice } from "./doctorVisitSlice";
import {themeSlice} from './themeSlice';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Combine all reducers
const rootReducer = combineReducers({
  accounts: accountReducer,
  // currentLocation: currentLocationSlice.reducer,
  // doctorVisit: doctorVisitSlice.reducer,
  theme: themeSlice.reducer,
});

// Configure persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['accounts'], // Only persist the accounts slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export {store, persistor};
