import React, {ChangeEvent, useEffect, useId} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch} from "@/app/configureStore";
import {FormSelect, InputGroup} from "react-bootstrap";
import {selectProductLineList} from "@/ducks/productLines";
import {selectProductLineFilter, setProductLine} from "@/ducks/filters";
import {loadProductLines} from "@/ducks/productLines/actions";
import {LocalStore} from "chums-ui-utils";
import {storeKeys} from "@/app/constants";


export default function ProductLineSelect() {
    const dispatch = useAppDispatch();
    const productLines = useSelector(selectProductLineList);
    const value = useSelector(selectProductLineFilter);
    const id = useId();

    useEffect(() => {
        dispatch(loadProductLines());
    }, []);


    const onChange = (ev: ChangeEvent<HTMLSelectElement>) => {
        LocalStore.setItem(storeKeys.productLine, ev.target.value);
        dispatch(setProductLine(ev.target.value));
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Product Line</InputGroup.Text>
            <FormSelect value={value ?? ''} onChange={onChange}>
                <option value="">ALL</option>
                {productLines
                    .filter(pl => pl.active)
                    .map(pl => (
                        <option key={pl.ProductLine}
                                value={pl.ProductLine}>{pl.ProductLine} - {pl.ProductLineDesc}</option>
                    ))}
            </FormSelect>
        </InputGroup>
    )
}

