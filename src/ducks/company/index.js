import {fetchProductLines} from "../productLine";

export const COMPANY_CHUMS = {code: 'chums', name: 'Chums'};
export const COMPANY_BEYONDCOASTAL = {code: 'bc', name: 'Beyond Coastal'};
export const COMPANIES = [COMPANY_CHUMS, COMPANY_BEYONDCOASTAL];

export const companySelected = 'app/company/selected';

export const selectCompany = (state) => state.company;

export const setCompany = (company) => (dispatch, getState) => {
    dispatch({type: companySelected, company});
    dispatch(fetchProductLines());
};

const company = (state = COMPANY_CHUMS.code, action) => {
    const {type, company} = action;
    switch (type) {
    case companySelected:
        return company;
    default:
        return state;
    }
};

export default company;
