import React from 'react';
import Badge from "react-bootstrap/Badge";
import {BufferedItem} from "@/src/types";

const ItemStatusBadge = ({ItemStatus, InactiveItem}: Pick<BufferedItem, 'InactiveItem' | 'ItemStatus'>) => {
    return (
        <div>
            {ItemStatus && (
                <Badge bg={ItemStatus?.startsWith('D') ? 'dark' : 'warning'} className="me-1">{ItemStatus}</Badge>)}
            {InactiveItem === 'Y' && (<Badge bg="danger">Inactive</Badge>)}
        </div>
    )
};

export default ItemStatusBadge;
