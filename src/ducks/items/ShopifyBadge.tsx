import React from 'react';
import {Variant} from "react-bootstrap/types";
import Badge from "react-bootstrap/Badge";

export default function ShopifyBadge({status}: { status: string }) {
    if (!status) {
        return null;
    }
    const bg = (status:string):Variant => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'info'
            case 'archived':
                return 'secondary';
            default:
                return 'dark';
        }
    }
    return (
        <Badge bg={bg(status)}>{status}</Badge>
    )
}
