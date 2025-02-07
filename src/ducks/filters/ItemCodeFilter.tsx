import React, {memo, useEffect, useId, useState} from 'react';
import {FormControl, InputGroup} from "react-bootstrap";
import {selectItemFilter, setItemCode} from "@/ducks/filters/index";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";


const ItemCodeFilter = () => {
    const dispatch = useAppDispatch();
    const itemCode = useAppSelector(selectItemFilter);
    const id = useId();
    const listId = useId();

    const [item, setItem] = useState<string>(itemCode ?? '');
    const onBlur = () => dispatch(setItemCode(item));

    useEffect(() => {
        let timer = window.setTimeout(() => dispatch(setItemCode(item)), 350);
        return () => window.clearTimeout(timer);
    }, [item]);

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Item</InputGroup.Text>
            <FormControl type="search" id={id} list={listId}
                         className="form-control form-control-sm"
                         placeholder="Filter Items"
                         value={item}
                         onBlur={onBlur}
                         onChange={(ev) => setItem(ev.target.value)}/>
            {/*<ItemsDataList id={listId}/>*/}
        </InputGroup>
    )
}

export default memo(ItemCodeFilter);
