import React, {ChangeEvent, useId} from "react";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {FormCheck} from "react-bootstrap";
import {selectShowOnlyWebsites, toggleShowOnlyWebsites} from "@/ducks/filters/index";
import {LocalStore} from "chums-ui-utils";
import {storeKeys} from "@/app/constants";

export default function WebsitesItemsToggle() {
    const dispatch = useAppDispatch();
    const websitesFilter = useAppSelector(selectShowOnlyWebsites);
    const id = useId();

    const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
        LocalStore.setItem(storeKeys.showOnlyWebsites, ev.target.checked);
        dispatch(toggleShowOnlyWebsites(ev.target.checked));
    }

    return (
        <FormCheck id={id} label="Show Only Website Items" checked={websitesFilter} onChange={onChange}/>
    )
}

