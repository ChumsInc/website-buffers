import {ProductLine} from "chums-types";
import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {loadProductLines} from "@/ducks/productLines/actions";
import {dismissAlert} from "@/ducks/alerts/actions";
import {RootState} from "@/app/configureStore";


const productLineAdapter = createEntityAdapter<ProductLine, string>({
    selectId: (pl) => pl.ProductLine,
    sortComparer: (a, b) => a.ProductLine.localeCompare(b.ProductLine)
});
const plSelectors = productLineAdapter.getSelectors<RootState>(
    (state) => state.productLines
);

const productLineSlice = createSlice({
    name: 'productLines',
    initialState: productLineAdapter.getInitialState({
        status: 'idle' as 'idle' | 'loading' | 'rejected',
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadProductLines.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadProductLines.fulfilled, (state, action) => {
                productLineAdapter.setAll(state, action.payload);
                state.status = 'idle';
            })
            .addCase(loadProductLines.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(dismissAlert, (state, action) => {
                if (action.payload.context === loadProductLines.typePrefix) {
                    state.status = 'idle';
                }
            })
    },
    selectors: {
        selectProductLinesStatus: (state) => state.status,
    }
})
export const {selectProductLinesStatus} = productLineSlice.selectors;
export const selectProductLineList = plSelectors.selectAll;

export default productLineSlice;
