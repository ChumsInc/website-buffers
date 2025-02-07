import React, {ChangeEvent, useId} from "react";
import {selectShowInactive, toggleShowInactive} from "@/ducks/filters/index";
import {FormCheck} from "react-bootstrap";
import {LocalStore} from "chums-ui-utils";
import {storeKeys} from "@/app/constants";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";


const DiscontinuedItemsToggle = () => {
    const dispatch = useAppDispatch();
    const id = useId();
    const showInactive = useAppSelector(selectShowInactive);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        LocalStore.setItem(storeKeys.showInactive, ev.target.checked);
        dispatch(toggleShowInactive(ev.target.checked));
    }

    return (
        <FormCheck id={id} label="Show Inactive Items" checked={showInactive}
                   onChange={changeHandler}/>
    )
}
export default DiscontinuedItemsToggle;
