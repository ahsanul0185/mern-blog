import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/user/userSlice"
import themeReducer from "../features/theme/themeSlice"
import postReducer from "../features/posts/postSlice"
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import persistStore from 'redux-persist/es/persistStore';


const rootReducer = combineReducers({
    userR : userReducer,
    themeR : themeReducer,
    postR : postReducer
});

const persisConfig = {
    key : "root",
    storage,
    version : 1
};

const persistedReducer = persistReducer(persisConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware : (getDefaultMiddleware) =>  getDefaultMiddleware({serializableCheck : false}),
})

export const persistor = persistStore(store);