import {Item} from "chums-types";
import {WarehouseItem} from "chums-types/src/item";

export interface BufferedItem extends Pick<Item, 'ItemCode'|'ItemCodeDesc'|'ProductLine'|'ProductType'|'InactiveItem'> {
    id:number|null;
    WarehouseCode: string;
    buffer: number|null
    QuantityAvailable: number;
    QuantityOnHand: number;
    QuantityOrdered: number;
    QuantityOnIT: number;
    QtyRequiredForWO: number;
    active: boolean;
    ItemStatus: string|null;
    QuantityInBTX: number;
    shopify: string;
    b2b: string;
    ActualAvailable: number;
}
