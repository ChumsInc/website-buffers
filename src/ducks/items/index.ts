import {BufferedItem} from "@/src/types";
import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SortProps} from "chums-types";
import {loadItems, saveItemBuffer} from "@/ducks/items/actions";
import {itemSorter} from "@/ducks/items/utils";
import {RootState} from "@/app/configureStore";
import {createSelector} from "reselect";
import {
    selectItemFilter,
    selectMaxAvailable,
    selectProductLineFilter,
    selectShowInactive,
    selectShowOnlyBuffered,
    selectShowOnlyWebsites
} from "@/ducks/filters";
import {wcToRegex} from "@/src/utils";
import {dismissAlert} from "@/ducks/alerts/actions";

const itemsAdapter = createEntityAdapter<BufferedItem, string>({
    selectId: (item) => item.ItemCode,
    sortComparer: (a, b) => a.ItemCode.localeCompare(b.ItemCode),
})

const itemsSlice = createSlice({
    name: 'items',
    initialState: itemsAdapter.getInitialState({
        status: 'idle' as 'idle' | 'loading' | 'rejected',
        sort: {field: 'ItemCode', ascending: true} as SortProps<BufferedItem>
    }),
    reducers: {
        setItemsSort: (state, action: PayloadAction<SortProps<BufferedItem>>) => {
            state.sort = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadItems.fulfilled, (state, action) => {
                state.status = 'idle';
                itemsAdapter.setAll(state, action.payload)
            })
            .addCase(loadItems.rejected, (state, action) => {
                state.status = 'rejected';
            })
            .addCase(saveItemBuffer.fulfilled, (state, action) => {
                if (action.payload) {
                    itemsAdapter.setOne(state, action.payload)
                } else {
                    itemsAdapter.removeOne(state, action.meta.arg.ItemCode)
                }
            })
            .addCase(dismissAlert, (state, action) => {
                if (action.payload.context === loadItems.typePrefix) {
                    state.status = 'idle';
                }
            })
    },
    selectors: {
        selectItemsStatus: (state) => state.status,
        selectItemsSort: (state) => state.sort,
    }
});

export const {selectItemsStatus, selectItemsSort} = itemsSlice.selectors;


const itemSelectors = itemsAdapter.getSelectors<RootState>(
    (state) => state.items,
)

export const selectItemsList = itemSelectors.selectAll;

export const selectFilteredList = createSelector(
    [selectItemsList, selectItemsSort, selectProductLineFilter, selectShowOnlyBuffered, selectShowOnlyWebsites, selectShowInactive, selectItemFilter, selectMaxAvailable],
    (list, sort, productLine, showOnlyBuffered, showOnlyWebsites, showInactive, filterItem, maxAvailable) => {
        let itemRegEx;
        try {
            itemRegEx = new RegExp(wcToRegex(filterItem ?? ''), 'i');
        } catch (err) {
            itemRegEx = /^/;
        }

        return [...list]
            .filter(item => showInactive || item.InactiveItem !== 'Y')
            .filter(item => !showOnlyBuffered || (item.buffer ?? 0) !== 0)
            .filter(item => !showOnlyWebsites || (!!item.shopify || !!item.b2b))
            .filter(item => maxAvailable === null || item.QuantityAvailable <= maxAvailable)
            .filter(item => !productLine || item.ProductLine === productLine)
            .filter(item => !filterItem || itemRegEx.test(item.ItemCode) || itemRegEx.test(item.ItemCodeDesc))
            .sort(itemSorter(sort));
    }
)

export default itemsSlice;




