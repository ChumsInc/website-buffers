import React, {FormEvent, useCallback} from 'react';
import {selectItemsStatus} from '@/ducks/items';
import ProductLineSelect from "@/components/ProductLineSelect";
import BufferedItemsToggle from "../ducks/filters/BufferedItemsToggle";
import DiscontinuedItemsToggle from "../ducks/filters/DiscontinuedItemsToggle";
import WebsitesItemsToggle from "../ducks/filters/WebsitesItemsToggle";
import ItemCodeFilter from "../ducks/filters/ItemCodeFilter";
import MaxAvailableFilter from "../ducks/filters/MaxAvailableFilter";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from "react-bootstrap/Button";
import {loadItems} from "@/ducks/items/actions";
import {selectItemFilter, selectProductLineFilter} from "@/ducks/filters";

export default function AppControlBar() {
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
        <Stack direction="horizontal" gap={2} className="space-between">
            <Row gap={3} className="align-items-baseline" as="form" onSubmit={onSubmit}>
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
            <div className="row g-3 align-items-baseline ms-auto">
                <div className="col-auto">
                    Filters:
                </div>
                <div className="col-auto">
                    <MaxAvailableFilter/>
                </div>
                <div className="col-auto">
                    <BufferedItemsToggle/>
                </div>
                <div className="col-auto">
                    <DiscontinuedItemsToggle/>
                </div>
                <div className="col-auto">
                    <WebsitesItemsToggle/>
                </div>
            </div>
        </Stack>
    );
}

