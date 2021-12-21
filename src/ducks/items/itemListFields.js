import ItemStatusBadge from "../../components/ItemStatusBadge";
import {Badge} from "chums-ducks";
import BufferInput from "./BufferInput";
import numeral from "numeral";
import React from "react";

export const fields = [
    {field: 'ItemCode', title: 'Item', sortable: true},
    {field: 'WarehouseCode', title: 'Whse', sortable: true},
    {field: 'ItemCodeDesc', title: 'Description', sortable: true},
    {field: 'ProductType', title: 'Prod Type', sortable: true},
    {field: 'ProductLine', title: 'Prod Line', sortable: true},
    {
        field: 'ItemStatus',
        title: 'Status',
        sortable: true,
        render: ({ItemStatus, InactiveItem}) => (<ItemStatusBadge ItemStatus={ItemStatus} InactiveItem={InactiveItem}/>)
    },
    {field: 'shopify', title: 'Shopify', render: ({shopify}) => <Badge color="info" text={shopify}/>},
    {field: 'b2b', title: 'B2B', render: ({b2b}) => <Badge color="success" text={b2b}/>},
    {
        field: 'buffer',
        title: 'Buffer', sortable: true,
        sortFn: ({buffer}) => Number(buffer || 0),
        render: row => (<BufferInput {...row} />)
    },
    {
        field: 'QuantityOnHand',
        title: 'On Hand', sortable: true,
        className: 'right',
        render: ({QuantityOnHand}) => numeral(QuantityOnHand).format(0, 0)
    },
    {
        field: 'QuantityOrdered',
        title: 'On Order', sortable: true,
        className: 'right',
        render: ({QuantityOrdered}) => !!QuantityOrdered ? numeral(QuantityOrdered).format('0,0') : ''
    },
    {
        field: 'QtyRequiredForWO',
        title: 'Req for WO', sortable: true,
        className: 'right',
        render: ({QtyRequiredForWO}) => !!QtyRequiredForWO ? numeral(QtyRequiredForWO).format('0,0') : ''
    },
    {
        field: 'QuantityOnIT',
        title: 'On I/T', sortable: true,
        className: 'right',
        render: ({QuantityOnIT}) => !!QuantityOnIT ? numeral(QuantityOnIT).format('0,0') : ''
    },
    {
        field: 'QuantityInBTX',
        title: 'In BTX', sortable: true,
        className: 'right',
        render: ({QuantityInBTX}) => !!QuantityInBTX ? numeral(QuantityInBTX).format('0,0') : ''
    },
    {
        field: 'ActualAvailable',
        title: 'Actual Available', sortable: true,
        className: 'right',
        render: ({ActualAvailable}) => numeral(ActualAvailable).format(0, 0)
    },
    {
        field: 'QuantityAvailable',
        title: 'Buffered Available', sortable: true,
        className: 'right',
        render: ({QuantityAvailable}) => numeral(QuantityAvailable).format(0, 0)
    },
];
