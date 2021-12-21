import React from 'react';
import {useSelector} from "react-redux";
import {selectFilteredList} from "./index";


const ExcelDownloadButton = () => {
    const list = useSelector(selectFilteredList({field: 'ItemCode', ascending: true}));
    const XLSX = window.XLSX;
    const download = window.download;

    const disabled = list.length === 0 || !XLSX || !download;


    const buildDownloadData = () => {
        const rows = [];
        rows.push(['Item', 'Whse', 'Description', 'Prod Type', 'Prod Line', 'Status', 'Web', 'B2B',
            'Buffer', 'On Hand', 'On Order', 'Req WO', 'On IT', 'In BTX', 'Actual Available', 'Buffered Available']);
        list.forEach(row => {
            const {ItemCode, WarehouseCode, ItemCodeDesc, ProductType, ProductLine, ItemStatus, shopify, b2b,
                buffer, QuantityOnHand, QuantityOnOrder, QtyRequiredForWO, QuantityOnIT, QuantityInBTX,
                ActualAvailable, QuantityAvailable} = row;
            rows.push([ItemCode, WarehouseCode, ItemCodeDesc, ProductType, ProductLine, ItemStatus, shopify, b2b,
                buffer, QuantityOnHand, QuantityOnOrder, QtyRequiredForWO, QuantityOnIT, QuantityInBTX,
                ActualAvailable, QuantityAvailable]);
        });
        return rows;
    }
    const clickHandler = () => {
        const d = new Date();
        const date = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
        const data = buildDownloadData();
        const sheet = window.XLSX.utils.aoa_to_sheet(data);
        const workbook = window.XLSX.write({SheetNames: ['Available Items'], Sheets: {['Available Items']:sheet}}, {type: 'buffer', cellDates: false, compression: true, bookSST: true, bookType: 'xlsx'});
        window.download(workbook, `AvailableItems-${date}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }

    return (
        <button type="button" className="btn btn-sm btn-outline-secondary"
                onClick={clickHandler} disabled={list.length === 0}>
            Download
        </button>
    )
}

export default ExcelDownloadButton;
