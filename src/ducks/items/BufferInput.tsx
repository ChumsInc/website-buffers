import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {saveItemBuffer} from "@/ducks/items/actions";
import {BufferedItem} from "@/src/types";
import {useAppDispatch} from "@/app/configureStore";
import {FormControl, InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";


export default function BufferInput({item}: { item: BufferedItem; }) {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<number>(item.buffer ?? 0);
    const [changed, setChanged] = useState<boolean>(false);
    const [status, setStatus] = useState<'idle' | 'saving'>('idle');

    useEffect(() => {
        setValue(item.buffer ?? 0);
        setChanged(false);
        setStatus('idle');
    }, [item]);

    const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const value = ev.currentTarget.valueAsNumber;
        setValue(value);
        setChanged(value !== item.buffer);
    }
    const submitHandler = async (ev: FormEvent) => {
        ev.preventDefault();
        setStatus('saving');
        await dispatch(saveItemBuffer({...item, buffer: value}))
    }

    return (
        <InputGroup size="sm" as="form" onSubmit={submitHandler} style={{maxWidth: "9rem"}}>
            <FormControl value={value || ''} onChange={onChange} type="number" step={1} className="text-end" aria-label={`Buffer Quantity for ${item.ItemCode}`}/>
            <Button type="submit" disabled={status !== 'idle' || value === item.buffer}
                    onClick={submitHandler}
                    variant={changed ? 'warning' : 'outline-primary'} aria-label="Save">
                <span className="bi-cloud-upload" aria-hidden="true"/>
            </Button>
        </InputGroup>
    )
}
