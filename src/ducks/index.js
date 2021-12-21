import {combineReducers} from 'redux';
import filters from "./filters";
import items from "./items";
import productLineReducer from './productLine';
import companyReducer from './company';
import {alertsReducer, pagesReducer, sortableTablesReducer} from 'chums-ducks';

export default combineReducers({
    company: companyReducer,
    productLine: productLineReducer,
    filters,
    items,
    alerts: alertsReducer,
    pages: pagesReducer,
    sortableTables: sortableTablesReducer,
})
