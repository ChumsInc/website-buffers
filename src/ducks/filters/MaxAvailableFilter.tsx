import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectMaxAvailable, setMaxAvailable} from "@/ducks/filters/index";
import {FormControl, InputGroup} from "react-bootstrap";
import {LocalStore} from "chums-ui-utils";
import {storeKeys} from "@/app/constants";

export default function MaxAvailableFilter() {
    const dispatch = useAppDispatch();
    const maxAvailable = useAppSelector(selectMaxAvailable);
    const id = useId();

    const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const _value = ev.target.value === '' ? null : ev.target.valueAsNumber;
        LocalStore.setItem<number | null>(storeKeys.maxAvailable, _value);
        dispatch(setMaxAvailable(_value));
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Max Available</InputGroup.Text>
            <FormControl type="number" value={maxAvailable === null ? '' : maxAvailable} className="text-center"
                         onChange={onChange}/>
        </InputGroup>
    )
}

