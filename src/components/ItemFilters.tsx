import React from 'react';
import Row, {RowProps} from "react-bootstrap/Row";
import MaxAvailableFilter from "@/ducks/filters/MaxAvailableFilter";
import BufferedItemsToggle from "@/ducks/filters/BufferedItemsToggle";
import DiscontinuedItemsToggle from "@/ducks/filters/DiscontinuedItemsToggle";
import WebsitesItemsToggle from "@/ducks/filters/WebsitesItemsToggle";
import Col from "react-bootstrap/Col";
import classNames from "classnames";

export default function ItemFilters({className, ...props}: RowProps) {
    return (
        <Row className={classNames("row g-3 align-items-baseline", className)} {...props}>
            <Col xs="auto">
                Filters:
            </Col>
            <Col xs="auto">
                <MaxAvailableFilter/>
            </Col>
            <Col xs="auto">
                <BufferedItemsToggle/>
            </Col>
            <Col xs="auto">
                <DiscontinuedItemsToggle/>
            </Col>
            <Col xs="auto">
                <WebsitesItemsToggle/>
            </Col>
        </Row>
    )
}
