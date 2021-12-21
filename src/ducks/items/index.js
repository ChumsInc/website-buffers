import {buildPath, fetchGET, fetchPOST} from "../../fetch";
import {onErrorAction} from "chums-ducks";
import {combineReducers} from "redux";
import {selectBuffered, selectDiscontinued, selectFilters, selectItemCode, selectWebsites} from "../filters";
import {selectProductLine} from "../productLine";
import {selectCompany} from "../company";
import {createSelector} from "reselect";
import {wcToRegex} from "../../utils";
import {sorter} from "./sort";

export const URL_FETCH_ITEMS = '/api/operations/production/buffer/:company/:itemCode';
export const URL_POST_BUFFER = '/api/operations/production/buffer/:Company/:ItemCode/:WarehouseCode';


const fetchItemsRequested = 'app/items/fetch-requested';
const fetchItemsSucceeded = 'app/items/fetch-succeeded';
const fetchItemsFailed = 'app/items/fetch-failed';
const saveBufferRequested = 'app/items/save-buffer-requested';
const saveBufferSucceeded = 'app/items/save-buffer-succeeded';
const saveBufferFailed = 'app/items/save-buffer-failed';
const itemSelected = 'app/items/item-selected';
const itemBufferChanged = 'app/items/buffer-changed';

export const selectLoading = (state) => state.items.loading;
export const selectList = (state) => state.items.list;
export const selectSelected = (state) => state.items.selected;

const itemSort = (a, b) => `${a.ItemCode}/${a.WarehouseCode}` > `${b.ItemCode}/${b.WarehouseCode}` ? 1 : -1;

/**
 *
 * @param {object} sort
 * @param {object} sort.field
 * @param {boolean} sort.ascending
 * @return {*}
 */
export const selectFilteredList = (sort) => createSelector(
    selectList,
    selectFilters,
    selectProductLine,
    (list, filters, productLine) => {
        const {discontinued, itemCode, buffered, websites, maxAvailable} = filters;
        let itemRegEx;
        try {
            itemRegEx = new RegExp(wcToRegex(itemCode), 'i');
        } catch (err) {
            console.log(err.message);
            itemRegEx = /^/;
        }
        return list.filter(item => discontinued === false || /^D/.test(item.ItemStatus) || item.InactiveItem === 'Y')
            .filter(item => buffered === false || (item.buffer || 0) !== 0 || item.changed)
            .filter(item => websites === false || (item.shopify || item.b2b || '') > '')
            .filter(item => maxAvailable === null || item.QuantityAvailable <= maxAvailable)
            .filter(item => productLine === '' || item.ProductLine === productLine)
            .filter(item => itemCode === '' || itemRegEx.test(item.ItemCode) || itemRegEx.test(item.ItemCodeDesc))
            .sort(sorter(sort));
    }
)

export const itemSelectedAction = (item) => ({type: itemSelected, payload: {item}});
export const onChangeBuffer = ({ItemCode, WarehouseCode, buffer}) => ({type: itemBufferChanged, payload: {ItemCode, WarehouseCode, buffer}});

export const fetchItems = () => async (dispatch, getState) => {
    const state = getState();
    const itemCode = selectItemCode(state);
    const productLine = selectProductLine(state);
    const company = selectCompany(state);
    const loading = selectLoading(state);

    if (loading) {
        return;
    }
    try {
        dispatch({type: fetchItemsRequested});
        const url = buildPath(URL_FETCH_ITEMS, {company, itemCode: itemCode || '%'})
            + (productLine ? `?productLine=${encodeURIComponent(productLine)}` : '');

        const {buffers} = await fetchGET(url, {cache: 'no-cache'});
        dispatch({type: fetchItemsSucceeded, payload: {list: buffers}});
    } catch (err) {
        console.warn("()", err.message);
        dispatch(onErrorAction(err, fetchItemsFailed));
        dispatch({type: fetchItemsFailed});
    }
};

export const saveBuffer = ({Company, ItemCode, WarehouseCode, buffer}) => async (dispatch, getState) => {

    try {
        const state = getState();
        const loading = selectLoading(state);
        if (loading) {
            return;
        }
        const url = buildPath(URL_POST_BUFFER, {Company, ItemCode, WarehouseCode});
        dispatch({type: saveBufferRequested, payload: {ItemCode, WarehouseCode}});
        const {buffer: item} = await fetchPOST(url, {buffer});
        dispatch({type: saveBufferSucceeded, payload: {item}});
    } catch (err) {
        console.warn("saveBuffer()", err.message);
        dispatch(onErrorAction(err, saveBufferFailed));
        dispatch({type: saveBufferFailed});
    }
};


const listReducer = (state = [], action) => {
    const {type, payload} = action;
    switch (type) {
    case fetchItemsSucceeded:
        if (payload.list) {
            return [...payload.list].sort(itemSort);
        }
        return [];
    case saveBufferRequested: {
        const {ItemCode, WarehouseCode} = payload;
        return [
            ...state.filter(i => i.ItemCode === ItemCode && i.WarehouseCode === WarehouseCode)
                .map(i => ({...i, saving: true})),
            ...state.filter(i => !(i.ItemCode === ItemCode && i.WarehouseCode === WarehouseCode))
        ].sort(itemSort);
    }
    case saveBufferSucceeded: {
        const {item} = payload;
        const {ItemCode, WarehouseCode} = item || {};
        return [
            ...state.filter(i => i.ItemCode === ItemCode && i.WarehouseCode === WarehouseCode)
                .map(i => ({...item})),
            ...state.filter(i => !(i.ItemCode === ItemCode && i.WarehouseCode === WarehouseCode))
        ].sort(itemSort);
    }
    case itemBufferChanged: {
        const {ItemCode, WarehouseCode, buffer} = payload.item;
        if (!ItemCode) {
            return state;
        }
        return [
            ...state.filter(item => item.ItemCode === ItemCode && item.WarehouseCode === WarehouseCode)
                .map(item => ({...item, buffer, changed: true})),
            ...state.filter(i => !(i.ItemCode === ItemCode && i.WarehouseCode === WarehouseCode))
        ].sort(itemSort);
    }
    default:
        return state;
    }
};

const loadingReducer = (state = false, action) => {
    const {type, status} = action;
    switch (type) {
    case fetchItemsRequested:
        return true;
    case fetchItemsSucceeded:
    case fetchItemsFailed:
        return false;
    default:
        return state;
    }
};

const selectedReducer = (state = {}, action) => {
    const {type, payload} = action;
    switch (type) {
    case itemSelected:
        if (payload.item) {
            return {...payload.item};
        }
        return {};
    case itemBufferChanged:
        return {...state, buffer: payload.buffer, changed: true};
    default:
        return state;
    }
}


export default combineReducers({
    list: listReducer,
    loading: loadingReducer,
    // selected: selectedReducer,
})
