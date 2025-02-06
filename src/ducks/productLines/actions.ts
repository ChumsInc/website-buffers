import {createAsyncThunk} from "@reduxjs/toolkit";
import {ProductLine} from "chums-types";
import {RootState} from "@/app/configureStore";
import {selectProductLinesStatus} from "@/ducks/productLines";
import {fetchProductLines} from "@/ducks/productLines/api";

export const loadProductLines = createAsyncThunk<ProductLine[], void, { state: RootState }>(
    'product-lines/load',
    async () => {
        return fetchProductLines();
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectProductLinesStatus(state) === 'idle';
        }
    }
)
