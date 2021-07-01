import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Select from "../../common-components/Select";
import {COMPANIES, selectCompany, setCompany} from './index';

const CompanySelect = () => {
    const dispatch = useDispatch();
    const company = useSelector(selectCompany);

    return (
        <Select value={company} onChange={({value}) => dispatch(setCompany(value))}>
            {COMPANIES.map(company => (
                <option key={company.code} value={company.code}>{company.name}</option>
            ))}
        </Select>
    );
}
export default CompanySelect;
