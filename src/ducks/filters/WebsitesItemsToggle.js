import CheckboxToggle from "../../components/CheckboxToggle";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {onToggleWebsites, selectWebsites} from "./index";

const WebsitesItemsToggle = () => {
    const dispatch = useDispatch();
    const websitesFilter = useSelector(selectWebsites);
    return (
        <CheckboxToggle label="Only Website Items" checked={websitesFilter} onChange={() => dispatch(onToggleWebsites())}/>
    )
}
export default WebsitesItemsToggle;
