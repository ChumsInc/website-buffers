import {buildPath, fetchGET} from "../../fetch";
import {combineReducers} from "redux";
import {companySelected, selectCompany} from "../company";
import {onErrorAction} from "chums-ducks";

const PATH_PRODUCT_LINES = '/api/search/prodline/:company/';

const productLineSelected = 'app/productLine/selected';
const fetchRequested = 'app/productLine/fetch-requested';
const fetchSucceeded = 'app/productLine/fetch-succeeded';
const fetchFailed = 'app/productLine/fetch-failed';

export const selectProductLineList = (state) => state.productLine.list;
export const selectProductLine = (state) => state.productLine.selected;
export const selectLoading = (state) => state.productLine.loading;

export const fetchProductLines = () => (dispatch, getState) => {
    const state = getState();
    const loading = selectLoading(state);
    const company = selectCompany(state);
    if (loading) {
        return;
    }

    const url = buildPath(PATH_PRODUCT_LINES, {company});
    dispatch({type: fetchRequested});
    return fetchGET(url, {cache: 'no-cache'})
        .then(response => {
            const list = response.result || [];
            dispatch({type: fetchSucceeded, payload: {list}});
        })
        .catch(err => {
            dispatch({type: fetchFailed, payload: err.message});
            dispatch(onErrorAction(err, fetchFailed));
        });
};

export const setProductLine = (productLine) => ({type: productLineSelected, payload: {productLine}});

const listReducer = (state = [], action) => {
    const {type, payload} = action;
    switch (type) {
    case fetchSucceeded:
        return [...payload.list];
    case companySelected:
        return [];
    default:
        return state;
    }
}

const selectedReducer = (state = '', action) => {
    const {type, payload} = action;
    switch (type) {
    case fetchSucceeded: {
        const [pl = {}] = payload.list.filter(pl => pl.productLine === state);
        return pl.productLine || '';
    }
    case productLineSelected:
        return payload.productLine || '';
    case companySelected:
        return '';
    default:
        return state;
    }
};

const loadingReducer = (state = false, action) => {
    switch (action.type) {
    case fetchRequested:
        return true;
    case fetchFailed:
    case fetchSucceeded:
        return false;
    default:
        return state;
    }
}


export default combineReducers({
    list: listReducer,
    selected: selectedReducer,
    loading: loadingReducer,
})
