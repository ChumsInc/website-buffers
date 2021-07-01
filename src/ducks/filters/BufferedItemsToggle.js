import CheckboxToggle from "../../components/CheckboxToggle";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {onToggleBuffered, selectBuffered} from "./index";

const BufferedItemsToggle = () => {
    const dispatch = useDispatch();
    const buffered = useSelector(selectBuffered);
    return (
        <CheckboxToggle label="Only Buffered" checked={buffered} onChange={() => dispatch(onToggleBuffered())} />
    )
}
export default BufferedItemsToggle;
