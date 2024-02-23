import {configureStore, combineReducers} from '@reduxjs/toolkit'
import { categoriesReducer } from "./categoriesReducer";
import { productsReducer } from "./productsReducer";
import { productReducer } from "./productReducer";
import productsbasketSlice from "./basketProductsSlice";

import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from 'redux-persist'
import modalSlice from './modalSlice';

const persingConfig = {
    key: 'localStore',
    storage, 
    whitelist: ['productsbasket'], 
}

const rootReducer = combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
    product: productReducer,
    productsbasket: productsbasketSlice,
    modal: modalSlice
})

const persistedReducer = persistReducer(persingConfig, rootReducer)



export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types in the serialization check
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                // Or ignore certain paths in the state
                ignoredPaths: ['itemsNotSerializable'],
            },
        }),
});

export const persistor = persistStore(store)
