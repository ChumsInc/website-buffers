import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import alertsReducer from "@/ducks/alerts";
import itemsSlice from "@/ducks/items";
import filtersSlice from "@/ducks/filters";
import {api} from "@/app/services/api";
import {setupListeners} from "@reduxjs/toolkit/query/react";

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    alerts: alertsReducer,
    [filtersSlice.reducerPath]: filtersSlice.reducer,
    [itemsSlice.reducerPath]: itemsSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }).concat(api.middleware)
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store;
