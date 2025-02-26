import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LocalStore} from "@chumsinc/ui-utils";
import {storeKeys} from "@/app/constants";

export interface FiltersState {
    showOnlyBuffered: boolean;
    showInactive: boolean;
    showOnlyWebsites: boolean;
    itemCode: string | null;
    productLine: string | null;
    maxAvailable: number | null;
}

const initialState = (): FiltersState => {
    return {
        showOnlyBuffered: LocalStore.getItem(storeKeys.filterBuffered, false),
        showInactive: LocalStore.getItem(storeKeys.showInactive, false),
        showOnlyWebsites: LocalStore.getItem(storeKeys.showOnlyWebsites, true),
        itemCode: '',
        productLine: LocalStore.getItem<string>(storeKeys.productLine, ''),
        maxAvailable: LocalStore.getItem(storeKeys.maxAvailable, null),
    } satisfies FiltersState as FiltersState;
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState: initialState ,
    reducers: {
        toggleOnlyBuffered: (state, action: PayloadAction<boolean>) => {
            state.showOnlyBuffered = action.payload;
        },
        toggleShowInactive: (state, action: PayloadAction<boolean>) => {
            state.showInactive = action.payload;
        },
        toggleShowOnlyWebsites: (state, action: PayloadAction<boolean>) => {
            state.showOnlyWebsites = action.payload;
        },
        setProductLine: (state, action: PayloadAction<string>) => {
            state.productLine = action.payload;
        },
        setItemCode: (state, action: PayloadAction<string>) => {
            state.itemCode = action.payload;
        },
        setMaxAvailable: (state, action: PayloadAction<number | null>) => {
            state.maxAvailable = action.payload;
        }
    },
    selectors: {
        selectShowOnlyBuffered: (state):boolean => state.showOnlyBuffered,
        selectShowInactive: (state):boolean => state.showInactive,
        selectShowOnlyWebsites: (state):boolean => state.showOnlyWebsites,
        selectItemFilter: (state):string|null => state.itemCode,
        selectProductLineFilter: (state):string|null => state.productLine,
        selectMaxAvailable: (state):number|null => state.maxAvailable,
    }
})

export const {
    selectMaxAvailable,
    selectProductLineFilter,
    selectItemFilter,
    selectShowOnlyWebsites,
    selectShowInactive,
    selectShowOnlyBuffered
} = filtersSlice.selectors;

export const {
    setMaxAvailable,
    setItemCode,
    toggleShowInactive,
    toggleShowOnlyWebsites,
    toggleOnlyBuffered,
    setProductLine
} = filtersSlice.actions;


export default filtersSlice;
