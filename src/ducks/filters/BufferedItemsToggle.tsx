import React, {ChangeEvent, useId} from "react";
import {selectShowOnlyBuffered, toggleOnlyBuffered} from "@/ducks/filters/index";
import {FormCheck} from "react-bootstrap";
import {LocalStore} from "chums-ui-utils";
import {storeKeys} from "@/app/constants";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";


const BufferedItemsToggle = () => {
    const dispatch = useAppDispatch();
    const id = useId();
    const buffered = useAppSelector(selectShowOnlyBuffered);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        LocalStore.setItem(storeKeys.filterBuffered, ev.target.checked);
        dispatch(toggleOnlyBuffered(ev.target.checked));
    }

    return (
        <FormCheck id={id} label="Show Only Buffered" checked={buffered} onChange={changeHandler}/>
    )
}
export default BufferedItemsToggle;
