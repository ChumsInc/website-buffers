import React, {useCallback, useEffect} from 'react';
import {useSelector} from "react-redux";
import {selectFilteredList} from "./index";
import {BufferedItem} from "@/src/types";
import dayjs from "dayjs";
import Button from "react-bootstrap/Button";



type DownloadDataRow = (string | number)[];

const buildDownloadData = (list: BufferedItem[]): DownloadDataRow[] => {
    const rows: DownloadDataRow[] = [];
    rows.push(['Item', 'Whse', 'Description', 'Prod Type', 'Prod Line', 'Status', 'Web', 'B2B',
        'Buffer', 'On Hand', 'On Order', 'Req WO', 'On IT', 'In BTX', 'Actual Available', 'Buffered Available']);
    list.forEach(row => {
        const {
            ItemCode, WarehouseCode, ItemCodeDesc, ProductType, ProductLine, ItemStatus, shopify, b2b,
            buffer, QuantityOnHand, QuantityOrdered, QtyRequiredForWO, QuantityOnIT, QuantityInBTX,
            ActualAvailable, QuantityAvailable
        } = row;
        rows.push([ItemCode, WarehouseCode, ItemCodeDesc, ProductType, ProductLine, ItemStatus ?? '', shopify, b2b,
            buffer ?? 0, QuantityOnHand, QuantityOrdered, QtyRequiredForWO, QuantityOnIT, QuantityInBTX,
            ActualAvailable, QuantityAvailable]);
    });
    return rows;
}


function ExcelDownloadButton() {
    const list = useSelector(selectFilteredList);
    const [disabled, setDisabled] = React.useState(list.length === 0);

    const clickHandler = useCallback(() => {
        const sheet = window.XLSX.utils.aoa_to_sheet(buildDownloadData(list));
        const workbook = window.XLSX.write({
            SheetNames: ['Available Items'],
            Sheets: {['Available Items']: sheet}
        }, {type: 'buffer', cellDates: false, compression: true, bookSST: true, bookType: 'xlsx'});
        const filename = `AvailableItems_${dayjs().format('YYYY-MM-DD-HHmm')}.xlsx`;

        window.download(workbook, filename, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }, [list])

    useEffect(() => {
        setDisabled(!list.length);
    }, [list]);


    return (
        <Button type="button" size="sm" variant="outline-primary" onClick={clickHandler} disabled={disabled}>
            Download
        </Button>
    )
}

export default ExcelDownloadButton;
