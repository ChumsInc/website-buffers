import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectFilteredList, selectItemsSort} from "./index";
import {fields} from './itemListFields'
import ExcelDownloadButton from "./ExcelDownloadButton";
import {SortProps} from "chums-types";
import {BufferedItem} from "@/src/types";
import itemsSlice from "@/ducks/items";
import {SortableTable, TablePagination} from "sortable-tables";
import {LocalStore} from "chums-ui-utils";
import {storeKeys} from "@/app/constants";
import Stack from "react-bootstrap/Stack";


const trClassName = (row: BufferedItem) => {
    if (row.InactiveItem === 'Y') {
        return 'table-warning';
    }
    return '';
};

const ItemList = () => {
    const dispatch = useDispatch();
    const sort = useSelector(selectItemsSort);
    const list = useSelector(selectFilteredList);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(LocalStore.getItem(storeKeys.rowsPerPage, 10));

    useEffect(() => {
        setPage(0);
    }, [list, sort, rowsPerPage]);

    const sortChangeHandler = (sort: SortProps<BufferedItem>) => {
        dispatch(itemsSlice.actions.setItemsSort(sort));
    }

    const rowsPerPageChangeHandler = (rpp: number) => {
        LocalStore.setItem(storeKeys.rowsPerPage, rpp);
        setRowsPerPage(rpp);
    }

    return (
        <div className="mt-1">
            <SortableTable<BufferedItem> keyField="ItemCode"
                                         data={list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                                         fields={fields}
                                         className="mt-1 buffer-table"
                                         rowClassName={trClassName} size="sm"
                                         onChangeSort={sortChangeHandler}
                                         currentSort={sort}/>
            <Stack direction="horizontal" gap={3}>
                <ExcelDownloadButton/>
                <TablePagination page={page} onChangePage={setPage} count={list.length} className="ms-auto"
                                 rowsPerPage={rowsPerPage} rowsPerPageProps={{onChange: rowsPerPageChangeHandler}}
                                 showFirst showLast/>
            </Stack>
        </div>
    );
}

export default ItemList;
