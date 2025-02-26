import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {FormSelect, InputGroup} from "react-bootstrap";
import {selectProductLineFilter, setProductLine} from "@/ducks/filters";
import {LocalStore} from "@chumsinc/ui-utils";
import {storeKeys} from "@/app/constants";
import {useGetProductLinesQuery} from "@/app/services/productLines";
import {selectProductLineName} from "@/ducks/filters/selectors";


export default function ProductLineSelect() {
    const dispatch = useAppDispatch();
    const value = useAppSelector(selectProductLineFilter);
    const {data, isFetching} = useGetProductLinesQuery();
    const productLineName = useAppSelector(selectProductLineName);
    const id = useId();


    const onChange = (ev: ChangeEvent<HTMLSelectElement>) => {
        LocalStore.setItem(storeKeys.productLine, ev.target.value);
        dispatch(setProductLine(ev.target.value));
    }

    return (
        <InputGroup size="sm" title={productLineName}>
            <InputGroup.Text as="label" htmlFor={id}>Product Line</InputGroup.Text>
            <FormSelect value={value ?? ''} onChange={onChange} disabled={isFetching} id={id}>
                <option value="">ALL</option>
                {data && data.filter(pl => pl.active)
                    .map(pl => (
                        <option key={pl.ProductLine}
                                value={pl.ProductLine}>{pl.ProductLine} - {pl.ProductLineDesc}</option>
                    ))}
            </FormSelect>
        </InputGroup>
    )
}

