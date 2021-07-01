import React, {useEffect, useState, memo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {onChangeItemCode, selectItemCode} from "./index";
import {selectList} from "../items";

const ItemCodeFilter = () => {
    const dispatch = useDispatch();
    const itemCode = useSelector(selectItemCode);
    const items = useSelector(selectList);

    const [item, setItem] = useState(itemCode);
    const onBlur = () => dispatch(onChangeItemCode(item));

    useEffect(() => {
        let timer = window.setTimeout(() => dispatch(onChangeItemCode(item)), 350);
        return () => window.clearTimeout(timer);
    }, [item]);

    return (
        <>
            <input type="search" id="app--item-filter" list="app--item-filter-list"
                   className="form-control form-control-sm" placeholder="Filter Items"
                   value={item}
                   onBlur={onBlur}
                   onChange={(ev) => setItem(ev.target.value)}/>
            <datalist id="app--item-filter-list">
                {items.map((item, index) => (
                    <option key={index} value={item.ItemCode}>{item.ItemCode} {item.ItemCodeDesc}</option>
                ))}
            </datalist>
        </>
    )
}

export default memo(ItemCodeFilter);
