import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    addPageSetAction,
    PagerDuck,
    selectPagedData,
    selectTableSort,
    setPageAction,
    SortableTable,
    tableAddedAction
} from "chums-ducks";
import {selectFilteredList} from "./index";
import {fields} from './itemListFields'
import ExcelDownloadButton from "./ExcelDownloadButton";


const trClassName = (row) => {
    if (row.saving) {
        return 'table-info';
    }
    if (row.InactiveItem.toLowerCase() === 'Y') {
        return 'table-danger';
    }
    if (row.QuantityAvailable <= 0) {
        return 'text-danger';
    }
    return '';
};

const tableId = 'website-items'

const ItemList = () => {
    const dispatch = useDispatch();

    const sort = useSelector(selectTableSort(tableId));
    const data = useSelector(selectFilteredList(sort));
    const pagedData = useSelector(selectPagedData(tableId, data)) || [];

    useEffect(() => {
        dispatch(tableAddedAction({key: tableId, field: 'ItemCode', ascending: true}));
        dispatch(addPageSetAction({key: tableId}));
    })
    return (
        <div className="mt-1">
            <SortableTable keyField="ItemCode" tableKey={tableId} data={pagedData} fields={fields}
                           className="mt-1 buffer-table"
                           rowClassName={trClassName} size="sm"
                           onChangeSort={() => dispatch(setPageAction({current: 1, key: tableId}))}
                           defaultSort="ItemCode"/>
            <PagerDuck pageKey={tableId} dataLength={data.length}/>
            <ExcelDownloadButton />
        </div>
    );
}

export default ItemList;
