import React, {Fragment} from 'react';
import {Badge} from "chums-ducks";

const ItemStatusBadge = ({ItemStatus, InactiveItem}) => {
    return (
        <Fragment>
            <Badge color="dark" text={ItemStatus}/>
            {InactiveItem === 'Y' && (<Badge color="danger" text="Inactive" />)}
        </Fragment>
        )
};

export default ItemStatusBadge;
