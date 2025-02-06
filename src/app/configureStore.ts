import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import alertsReducer from "@/ducks/alerts";
import productLineSlice from "@/ducks/productLines";
import itemsSlice from "@/ducks/items";
import filtersSlice from "@/ducks/filters";

const rootReducer = combineReducers({
    alerts: alertsReducer,
    [filtersSlice.reducerPath]: filtersSlice.reducer,
    [itemsSlice.reducerPath]: itemsSlice.reducer,
    [productLineSlice.reducerPath]: productLineSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store;
