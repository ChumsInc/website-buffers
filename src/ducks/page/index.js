import {combineReducers} from "redux";

const currentPageChanged = 'app/page/currentPageChanged';
const rowsPerPageChanged = 'app/page/rowsPerPageChanged';

export const setPage = (page) => ({type: currentPageChanged, payload: page});
export const setRowsPerPage = (rowsPerPage) => ({type: rowsPerPageChanged, payload: rowsPerPage});

export const selectCurrentPage = (state) => state.page.current;
export const selectRowsPerPage = (state) => state.page.rowsPerPage;

const currentReducer = (state = 1, action) => {
    switch (action.type) {
    case currentPageChanged:
        return action.payload || 1;
    case rowsPerPageChanged:
        return 1;
    default: return state;
    }
}

const rowsPerPageReducer = (state = 25, action) => {
    switch (action.type) {
    case rowsPerPageChanged:
        return action.payload;
    default: return state;
    }
}

export default combineReducers({
    current: currentReducer,
    rowsPerPage: rowsPerPageReducer,
});
