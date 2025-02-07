import React, {FormEvent, useCallback} from 'react';
import Row, {RowProps} from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductLineSelect from "@/components/ProductLineSelect";
import ItemCodeFilter from "@/ducks/filters/ItemCodeFilter";
import Button from "react-bootstrap/Button";
import classNames from "classnames";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectItemsStatus} from "@/ducks/items";
import {selectItemFilter, selectProductLineFilter} from "@/ducks/filters";
import {loadItems} from "@/ducks/items/actions";


export default function LoadItemsForm({className, ...props}: RowProps) {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectItemsStatus);
    const itemCode = useAppSelector(selectItemFilter);
    const productLine = useAppSelector(selectProductLineFilter);

    const onSubmit = useCallback((ev: FormEvent) => {
            ev.preventDefault();
            dispatch(loadItems({itemCode, productLine}));
        },
        [itemCode, productLine]
    )

    return (
        <Row gap={3} {...props} className={classNames("align-items-baseline", className)} as="form" onSubmit={onSubmit}>
            <Col xs="auto">
                <ProductLineSelect/>
            </Col>
            <Col className="col-auto">
                <ItemCodeFilter/>
            </Col>
            <Col xs="auto">
                <Button type="submit" disabled={loading !== 'idle'} size="sm">Load</Button>
            </Col>
        </Row>
    )
}
