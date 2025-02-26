import ItemStatusBadge from "@/components/ItemStatusBadge";
import BufferInput from "@/ducks/items/BufferInput";
import numeral from "numeral";
import {SortableTableField} from "@chumsinc/sortable-tables";
import {BufferedItem} from "@/src/types";
import Badge from "react-bootstrap/Badge";
import ShopifyBadge from "@/ducks/items/ShopifyBadge";
import classNames from "classnames";

export const fields:SortableTableField<BufferedItem>[] = [
    {field: 'ItemCode', title: 'Item', sortable: true},
    {field: 'WarehouseCode', title: 'Whse', sortable: true},
    {field: 'ItemCodeDesc', title: 'Description', sortable: true},
    {field: 'ProductType', title: 'Prod Type', sortable: true, align: 'center'},
    {field: 'ProductLine', title: 'Prod Line', sortable: true, align: 'center'},
    {
        field: 'ItemStatus',
        title: 'Status',
        sortable: true,
        render: ({ItemStatus, InactiveItem}) => (<ItemStatusBadge ItemStatus={ItemStatus} InactiveItem={InactiveItem}/>)
    },
    {field: 'shopify', title: 'Shopify', render: ({shopify}) => <ShopifyBadge status={shopify} />, sortable: true},
    {field: 'b2b', title: 'B2B', render: ({b2b}) => <Badge bg="success">{b2b}</Badge>, sortable: true},
    {
        field: 'buffer',
        title: 'Buffer',
        sortable: true,
        render: row => (<BufferInput item={row} />)
    },
    {
        field: 'QuantityOnHand',
        title: 'On Hand', sortable: true,
        align: 'end',
        render: ({QuantityOnHand}) => numeral(QuantityOnHand).format('0,0')
    },
    {
        field: 'QuantityOrdered',
        title: 'On Order', sortable: true,
        align: 'end',
        render: ({QuantityOrdered}) => !!QuantityOrdered ? numeral(QuantityOrdered).format('0,0') : ''
    },
    {
        field: 'QtyRequiredForWO',
        title: 'Req for WO', sortable: true,
        align: 'end',
        render: ({QtyRequiredForWO}) => !!QtyRequiredForWO ? numeral(QtyRequiredForWO).format('0,0') : ''
    },
    {
        field: 'QuantityOnIT',
        title: 'On I/T', sortable: true,
        align: 'end',
        render: ({QuantityOnIT}) => !!QuantityOnIT ? numeral(QuantityOnIT).format('0,0') : ''
    },
    {
        field: 'QuantityInBTX',
        title: 'In BTX', sortable: true,
        align: 'end',
        render: ({QuantityInBTX}) => !!QuantityInBTX ? numeral(QuantityInBTX).format('0,0') : ''
    },
    {
        field: 'ActualAvailable',
        title: 'Actual Available', sortable: true,
        align: 'end',
        className: (row) => classNames({'text-danger': row.ActualAvailable <= 0}),
        render: ({ActualAvailable}) => numeral(ActualAvailable).format('0,0')
    },
    {
        field: 'QuantityAvailable',
        title: 'Buffered Available', sortable: true,
        align: 'end',
        className: (row) => classNames({'text-danger': row.QuantityAvailable <= 0}),
        render: ({QuantityAvailable}) => numeral(QuantityAvailable).format('0,0')
    },
];
