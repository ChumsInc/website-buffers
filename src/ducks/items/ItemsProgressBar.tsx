import React from 'react';
import {useAppSelector} from "@/app/configureStore";
import {selectItemsStatus} from "@/ducks/items";
import {ProgressBar} from "react-bootstrap";

export default function ItemsProgressBar() {
    const status = useAppSelector(selectItemsStatus);
    if (status === 'idle') {
        return null;
    }
    return (
        <ProgressBar now={100} striped animated className="my-1" />
    )
}
