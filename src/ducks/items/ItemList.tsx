import React, {useEffect, useState} from 'react';
import {selectFilteredList, selectItemsSort, setItemsSort} from "./index";
import {fields} from './itemListFields'
import ExcelDownloadButton from "./ExcelDownloadButton";
import {SortProps} from "chums-types";
import {BufferedItem} from "@/src/types";
import {SortableTable, TablePagination} from "sortable-tables";
import {LocalStore} from "chums-ui-utils";
import {storeKeys} from "@/app/constants";
import Stack from "react-bootstrap/Stack";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";


const trClassName = (row: BufferedItem) => {
    if (row.InactiveItem === 'Y') {
        return 'table-warning';
    }
    return '';
};

const ItemList = () => {
    const dispatch = useAppDispatch();
    const sort = useAppSelector(selectItemsSort);
    const list = useAppSelector(selectFilteredList);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(LocalStore.getItem(storeKeys.rowsPerPage, 10));

    useEffect(() => {
        setPage(0);
    }, [list, sort, rowsPerPage]);

    const sortChangeHandler = (sort: SortProps<BufferedItem>) => {
        dispatch(setItemsSort(sort));
    }

    const rowsPerPageChangeHandler = (rpp: number) => {
        LocalStore.setItem(storeKeys.rowsPerPage, rpp);
        setRowsPerPage(rpp);
    }

    return (
        <div className="my-3">
            <SortableTable<BufferedItem> keyField="ItemCode" sticky
                                         data={list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                                         fields={fields}
                                         rowClassName={trClassName} size="sm"
                                         onChangeSort={sortChangeHandler}
                                         currentSort={sort}/>
            <Stack direction="horizontal" gap={3}>
                <ExcelDownloadButton/>
                <TablePagination page={page} size="sm" onChangePage={setPage} count={list.length} className="ms-auto"
                                 rowsPerPage={rowsPerPage} rowsPerPageProps={{onChange: rowsPerPageChangeHandler}}
                                 showFirst showLast/>
            </Stack>
        </div>
    );
}

export default ItemList;
