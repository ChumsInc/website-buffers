import CheckboxToggle from "../../components/CheckboxToggle";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {onToggleDiscontinued, selectDiscontinued} from "./index";

const DiscontinuedItemsToggle = () => {
    const dispatch = useDispatch();
    const discontinued = useSelector(selectDiscontinued);
    return (
        <CheckboxToggle label="Only Discontinued" checked={discontinued}
                        onChange={() => dispatch(onToggleDiscontinued())}/>
    )
}
export default DiscontinuedItemsToggle;
