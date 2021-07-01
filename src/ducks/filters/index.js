import {combineReducers} from "redux";

export const filtersBufferedClicked = 'app/filters/buffered-clicked';
export const filtersDiscontinuedClicked = 'app/filters/discontinued-clicked';
export const filtersWebsitesClicked = 'app/filters/websites-clicked';
export const filterItemChanged = 'app/filters/item-changed';
export const filterMaxAvailableChanged = 'app/filters/max-available-changed';

export const onToggleBuffered = () => ({type: filtersBufferedClicked});
export const onToggleDiscontinued = () => ({type: filtersDiscontinuedClicked});
export const onToggleWebsites = () => ({type: filtersWebsitesClicked});
export const onChangeItemCode = (itemCode) => ({type: filterItemChanged, payload: {itemCode}});
export const onChangeMaxAvailable = (value = null) => ({type: filterMaxAvailableChanged, payload: {value}});

export const selectBuffered = (state) => state.filters.buffered;
export const selectDiscontinued = (state) => state.filters.discontinued;
export const selectWebsites = (state) => state.filters.websites;
export const selectItemCode = (state) => state.filters.itemCode;
export const selectMaxAvailable = (state) => state.filters.maxAvailable;
export const selectFilters = (state) => state.filters;

const bufferedReducer = (state = false, action) => {
    switch (action.type) {
    case filtersBufferedClicked:
        return !state;
    default: return state;
    }
}

const discontinuedReducer = (state = false, action) => {
    switch (action.type) {
    case filtersDiscontinuedClicked:
        return !state;
    default: return state;
    }
}

const websitesReducer = (state = true, action) => {
    switch (action.type) {
    case filtersWebsitesClicked:
        return !state;
    default: return state;
    }
}

const itemCodeReducer = (state = '', action) => {
    switch (action.type) {
    case filterItemChanged:
        return action.payload.itemCode || '';
    default: return state;
    }
}

const maxAvailableReducer = (state = null, action) => {
    switch (action.type) {
    case filterMaxAvailableChanged:
        return action.payload.value;
    default: return state;
    }
}

export default combineReducers({
    buffered: bufferedReducer,
    discontinued: discontinuedReducer,
    websites: websitesReducer,
    itemCode: itemCodeReducer,
    maxAvailable: maxAvailableReducer,
});
