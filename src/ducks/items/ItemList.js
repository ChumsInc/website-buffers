import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ProgressBar from "../../common-components/ProgressBar";
import SortableTable from "../../common-components/SortableTable";

import numeral from 'numeral';
import BufferInput from "./BufferInput";
import {Badge} from "chums-ducks";
import ItemStatusBadge from "../../components/ItemStatusBadge";
import {selectFilteredList, selectList, selectLoading} from "./index";
import {selectFilters} from "../filters";
import {selectProductLine} from "../productLine";
import {selectCurrentPage, selectRowsPerPage, setPage, setRowsPerPage} from "chums-ducks";
import ConnectedRowsPerPage from "chums-ducks/dist/ducks/page/ConnectedRowsPerPage";
import ConnectedPagination from "chums-ducks/dist/ducks/page/ConnectedPagination";



const sorter = ({list, field, asc}) => {
    const sortFn = {
        _ItemCode: (a, b) => a.ItemCode.toLowerCase() === b.ItemCode.toLowerCase() ? 0 : (a.ItemCode.toLowerCase() > b.ItemCode.toLowerCase() ? 1 : -1) * (asc ? 1 : -1),
        _WarehouseCode: (a, b) => a.WarehouseCode.toLowerCase() === b.WarehouseCode.toLowerCase() ? 0 : (a.WarehouseCode.toLowerCase() > b.WarehouseCode.toLowerCase() ? 1 : -1) * (asc ? 1 : -1),
        _ItemCodeDesc: (a, b) => a.WarehouseCode.toLowerCase() === b.ItemCodeDesc.toLowerCase() ? 0 : (a.ItemCodeDesc.toLowerCase() > b.ItemCodeDesc.toLowerCase() ? 1 : -1) * (asc ? 1 : -1),
        _ProductType: (a, b) => a.ProductType.toLowerCase() === b.ProductType.toLowerCase() ? 0 : (a.ProductType.toLowerCase() > b.ProductType.toLowerCase() ? 1 : -1) * (asc ? 1 : -1),
        _ProductLine: (a, b) => a.ProductLine.toLowerCase() === b.ProductLine.toLowerCase() ? 0 : (a.ProductLine.toLowerCase() > b.ProductLine.toLowerCase() ? 1 : -1) * (asc ? 1 : -1),
        _ItemStatus: (a, b) => (a.ItemStatus || '').toLowerCase() === (b.ItemStatus || '').toLowerCase() ? 0 : ((a.ItemStatus || '').toLowerCase() > (b.ItemStatus || '').toLowerCase() ? 1 : -1) * (asc ? 1 : -1),
        _buffer: (a, b) => ((a.buffer || 0) - (b.buffer || 0)) * (asc ? 1 : -1),
        _QuantityOnHand: (a, b) => (a.QuantityOnHand - b.QuantityOnHand) * (asc ? 1 : -1),
        _QuantityOrdered: (a, b) => (a.QuantityOrdered - b.QuantityOrdered) * (asc ? 1 : -1),
        _QtyRequiredForWO: (a, b) => (a.QtyRequiredForWO - b.QtyRequiredForWO) * (asc ? 1 : -1),
        _QuantityInBTX: (a, b) => (a.QuantityInBTX - b.QuantityInBTX) * (asc ? 1 : -1),
        _QuantityOnIT: (a, b) => (a.QuantityOnIT - b.QuantityOnIT) * (asc ? 1 : -1),
        _ActualAvailable: (a, b) => (a.ActualAvailable - b.ActualAvailable) * (asc ? 1 : -1),
        _QuantityAvailable: (a, b) => (a.QuantityAvailable - b.QuantityAvailable) * (asc ? 1 : -1),
        ItemCode: (a, b) => sortFn._ItemCode(a, b) || sortFn._WarehouseCode(a, b),
        WarehouseCode: (a, b) => sortFn._WarehouseCode(a, b) || sortFn._ItemCode(a, b),
        ItemCodeDesc: (a, b) => sortFn._ItemCodeDesc(a, b) || sortFn._ItemCode(a, b) || sortFn._WarehouseCode(a, b),
        ProductType: (a, b) => sortFn._ProductType(a, b) || sortFn._ItemCode(a, b) || sortFn._WarehouseCode(a, b),
        ProductLine: (a, b) => sortFn._ProductLine(a, b) || sortFn._ItemCode(a, b) || sortFn._WarehouseCode(a, b),
        ItemStatus: (a, b) => sortFn._ItemStatus(a, b) || sortFn._ItemCode(a, b) || sortFn._WarehouseCode(a, b),
        buffer: (a, b) => sortFn._buffer(a, b) || sortFn._ItemCode(a, b) || sortFn._WarehouseCode(a, b),
        QuantityOnHand: (a, b) => sortFn._QuantityOnHand(a, b) || sortFn._ItemCode(a, b) || sortFn._WarehouseCode(a, b),
        QuantityOrdered: (a, b) => sortFn._QuantityOrdered(a, b) || sortFn._ItemCode(a, b) || sortFn._WarehouseCode(a, b),
        QtyRequiredForWO: (a, b) => sortFn._QtyRequiredForWO(a, b) || sortFn._ItemCode(a, b) || sortFn._WarehouseCode(a, b),
        QuantityOnIT: (a, b) => sortFn._QuantityOnIT(a, b) || sortFn._ItemCode(a, b) || sortFn._WarehouseCode(a, b),
        QuantityInBTX: (a, b) => sortFn._QuantityInBTX(a, b) || sortFn._ItemCode(a, b) || sortFn._WarehouseCode(a, b),
        ActualAvailable: (a, b) => sortFn._ActualAvailable(a, b) || sortFn._ItemCode(a, b) || sortFn._WarehouseCode(a, b),
        QuantityAvailable: (a, b) => sortFn._QuantityAvailable(a, b) || sortFn._ItemCode(a, b) || sortFn._WarehouseCode(a, b),
    };
    return list.sort(sortFn[field])
};

const fields = [
    {field: 'ItemCode', title: 'Item'},
    {field: 'WarehouseCode', title: 'Whse'},
    {field: 'ItemCodeDesc', title: 'Description'},
    {field: 'ProductType', title: 'Prod Type'},
    {field: 'ProductLine', title: 'Prod Line'},
    {
        field: 'ItemStatus',
        title: 'Status',
        render: ({ItemStatus, InactiveItem}) => (<ItemStatusBadge ItemStatus={ItemStatus} InactiveItem={InactiveItem}/>)
    },
    {field: 'shopify', title: 'Shopify', noSort: true, render: ({shopify}) => <Badge color="info" text={shopify}/>},
    {field: 'b2b', title: 'B2B', noSort: true, render: ({b2b}) => <Badge color="success" text={b2b}/>},
    {
        field: 'buffer',
        title: 'Buffer',
        sortFn: ({buffer}) => Number(buffer || 0),
        render: row => (<BufferInput {...row} />)
    },
    {
        field: 'QuantityOnHand',
        title: 'On Hand',
        className: 'right',
        render: ({QuantityOnHand}) => numeral(QuantityOnHand).format(0, 0)
    },
    {
        field: 'QuantityOrdered',
        title: 'On Order',
        className: 'right',
        render: ({QuantityOrdered}) => !!QuantityOrdered ? numeral(QuantityOrdered).format('0,0') : ''
    },
    {
        field: 'QtyRequiredForWO',
        title: 'Req for WO',
        className: 'right',
        render: ({QtyRequiredForWO}) => !!QtyRequiredForWO ? numeral(QtyRequiredForWO).format('0,0') : ''
    },
    {
        field: 'QuantityOnIT',
        title: 'On I/T',
        className: 'right',
        render: ({QuantityOnIT}) => !!QuantityOnIT ? numeral(QuantityOnIT).format('0,0') : ''
    },
    {
        field: 'QuantityInBTX',
        title: 'In BTX',
        className: 'right',
        render: ({QuantityInBTX}) => !!QuantityInBTX ? numeral(QuantityInBTX).format('0,0') : ''
    },
    {
        field: 'ActualAvailable',
        title: 'Actual Available',
        className: 'right',
        render: ({ActualAvailable}) => numeral(ActualAvailable).format(0, 0)
    },
    {
        field: 'QuantityAvailable',
        title: 'Buffered Available',
        className: 'right',
        render: ({QuantityAvailable}) => numeral(QuantityAvailable).format(0, 0)
    },
];

const trClassName = (row) => {
    if (row.saving) {
        return 'table-info';
    }
    if (row.InactiveItem.toLowerCase() === 'Y') {
        return 'table-danger';
    }
    if (row.QuantityAvailable <= 0) {
        return 'table-warning';
    }
    return '';
};

const ItemList = () => {
    const dispatch = useDispatch();
    const list = useSelector(selectList);
    const loading = useSelector(selectLoading);
    const page = useSelector(selectCurrentPage);
    const rowsPerPage = useSelector(selectRowsPerPage);

    const data = useSelector(selectFilteredList);
    return (
        <div className="mt-1">
            {!!loading && (<ProgressBar striped={true}/>)}
            <SortableTable data={data} fields={fields} className="mt-1 buffer-table" rowClassName={trClassName}
                           filtered={data.length < list.length} totalRecords={list.length}
                           page={page} onChangePage={(page) => dispatch(setPage(page))}
                           rowsPerPage={rowsPerPage}
                           onChangeRowsPerPage={(rowsPerPage) => dispatch(setRowsPerPage(rowsPerPage))}
                           sorter={sorter}
                           onChangeSort={() => dispatch(setPage(1))} defaultSort="ItemCode"/>
            <div className="row g-3">
                <div className="col-auto">
                    <label className="form-label">Rows Per Page</label>
                    <ConnectedRowsPerPage />
                </div>
                <div className="col-auto">
                    <label className="form-label">Page</label>
                    <ConnectedPagination dataLength={data.length} filtered={data.length !== list.length} />
                </div>
            </div>
        </div>
    );
}

export default ItemList;
