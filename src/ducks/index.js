import {combineReducers} from 'redux';
import filters from "./filters";
import items from "./items";
import productLineReducer from './productLine';
import companyReducer from './company';
import {alertReducer, pageReducer} from 'chums-ducks';

export default combineReducers({
    company: companyReducer,
    productLine: productLineReducer,
    filters,
    items,
    alerts: alertReducer,
    page: pageReducer,
})
