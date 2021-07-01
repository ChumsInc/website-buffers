import React, {useEffect, useState, memo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {onChangeItemCode, onChangeMaxAvailable, selectItemCode, selectMaxAvailable} from "./index";
import {selectList} from "../items";

const MaxAvailableFilter = () => {
    const dispatch = useDispatch();
    const maxAvailable = useSelector(selectMaxAvailable);

    const onChange = (ev) => {
        const value = ev.target.value;
        if (value === '') {
            return dispatch(onChangeMaxAvailable(null));
        }
        dispatch(onChangeMaxAvailable(Number(ev.target.value)));
    }

    return (
        <input type="number"
               className="form-control form-control-sm" placeholder="Max Available"
               value={typeof maxAvailable === 'number' ? maxAvailable : ''}
               onChange={onChange}/>
    )
}

export default memo(MaxAvailableFilter);
