import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchItems, selectLoading} from '../ducks/items';
import ProductLineSelect from "../ducks/productLine/ProductLineSelect";
import BufferedItemsToggle from "../ducks/filters/BufferedItemsToggle";
import DiscontinuedItemsToggle from "../ducks/filters/DiscontinuedItemsToggle";
import WebsitesItemsToggle from "../ducks/filters/WebsitesItemsToggle";
import ItemCodeFilter from "../ducks/filters/ItemCodeFilter";
import MaxAvailableFilter from "../ducks/filters/MaxAvailableFilter";
import {SpinnerButton} from "chums-ducks";

const AppControlBar = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);

    const onSubmit = (ev) => {
        ev.preventDefault();
        dispatch(fetchItems());
    }

    return (
        <div className="d-flex justify-content-between">
            <form className="row g-3 align-items-baseline" onSubmit={onSubmit}>
                <div className="col-auto">
                    Product Line
                </div>
                <div className="col-auto">
                    <ProductLineSelect/>
                </div>
                <div className="col-auto">
                    <SpinnerButton type="submit" spinning={loading} disabled={loading} size="sm">Load</SpinnerButton>
                </div>
            </form>
            <div className="row g-3 align-items-baseline">
                <div className="col-auto">
                    Filters:
                </div>
                <div className="col-auto">
                    <ItemCodeFilter/>
                </div>
                <div className="col-auto">
                    <MaxAvailableFilter/>
                </div>
                <div className="col-auto">
                    <BufferedItemsToggle/>
                </div>
                <div className="col-auto">
                    <DiscontinuedItemsToggle/>
                </div>
                <div className="col-auto">
                    <WebsitesItemsToggle/>
                </div>
            </div>
        </div>
    );
}
export default AppControlBar;
