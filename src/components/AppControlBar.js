import React from 'react';
import {useDispatch} from 'react-redux';
import {fetchItems} from '../ducks/items';

import FormGroup from "../common-components/FormGroup";
import CompanySelect from "../ducks/company/CompanySelect";
import ProductLineSelect from "../ducks/productLine/ProductLineSelect";
import BufferedItemsToggle from "../ducks/filters/BufferedItemsToggle";
import DiscontinuedItemsToggle from "../ducks/filters/DiscontinuedItemsToggle";
import WebsitesItemsToggle from "../ducks/filters/WebsitesItemsToggle";
import ItemCodeFilter from "../ducks/filters/ItemCodeFilter";
import MaxAvailableFilter from "../ducks/filters/MaxAvailableFilter";

const AppControlBar = () => {
    const dispatch = useDispatch();

    const onSubmit = (ev) => {
        ev.preventDefault();
        dispatch(fetchItems());
    }

    return (
        <div className="form-inline-split">
            <form className="row g-3" onSubmit={onSubmit}>
                <FormGroup inline={true} label="Company">
                    <CompanySelect/>
                </FormGroup>
                <FormGroup inline={true} label="Product Line">
                    <ProductLineSelect/>
                </FormGroup>
                <FormGroup inline={true} label="&nbsp;">
                    <button className="btn btn-sm btn-primary" type="submit">Load</button>
                </FormGroup>
            </form>
            <div className="row g-3">
                <FormGroup inline={true} label="Item Code">
                    <ItemCodeFilter/>
                </FormGroup>
                <FormGroup inline={true} label="Filter Max Available">
                    <MaxAvailableFilter/>
                </FormGroup>
                <FormGroup inline={true} label="Filter">
                    <BufferedItemsToggle/>
                </FormGroup>
                <FormGroup inline={true} label="Filter">
                    <DiscontinuedItemsToggle/>
                </FormGroup>
                <FormGroup inline={true} label="Filter">
                    <WebsitesItemsToggle/>
                </FormGroup>
            </div>
        </div>
    );
}
export default AppControlBar;
