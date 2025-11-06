import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice'; // Adjust the import path as necessary
import jobSlice from './jobSlice'; // Adjust the import path as necessary
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from 'redux';
import companySlice from './companySlice'; // Adjust the import path as necessary
import applicationSlice from './applicationSlice'; // Adjust the import path as necessary
 

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    auth:authSlice,
    job:jobSlice,
    company:companySlice,
    application:applicationSlice, // Adjust the import path as necessary
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export default store;