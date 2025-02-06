import {BufferedItem} from "@/src/types";
import {SortProps} from "chums-types";

type BufferedItemWarehouse = Pick<BufferedItem, 'ItemCode' | 'WarehouseCode'>

const itemWarehouse = (item: BufferedItemWarehouse) => `${item.ItemCode}:${item.WarehouseCode}`;
const itemWarehouseCompare = (a: BufferedItemWarehouse, b: BufferedItemWarehouse) => itemWarehouse(a).localeCompare(itemWarehouse(b));


export const itemSorter = ({field, ascending}: SortProps<BufferedItem>) =>
    (a: BufferedItem, b: BufferedItem) => {
        const sortMod = ascending ? 1 : -1;
        switch (field) {
            case 'ItemCode':
            case 'WarehouseCode':
            case 'ItemCodeDesc':
            case 'ProductLine':
            case 'ProductType':
                return (
                    a[field].localeCompare(b[field]) === 0
                        ? itemWarehouseCompare(a, b)
                        : a[field].localeCompare(b[field])
                ) * sortMod;
            case 'shopify':
            case 'b2b':
                return (
                    a[field].localeCompare(b[field]) === 0
                        ? itemWarehouseCompare(a, b)
                        : a[field].localeCompare(b[field])
                ) * sortMod;
            case 'buffer':
            case 'QuantityInBTX':
                return (
                    (a[field] ?? 0) === (b[field] ?? 0)
                        ? itemWarehouseCompare(a, b)
                        : (a[field] ?? 0) - (b[field] ?? 0)
                ) * sortMod;
            case 'ItemStatus':
                return (
                    (a[field] ?? '').localeCompare(b[field] ?? '') === 0
                        ? itemWarehouseCompare(a, b)
                        : (a[field] ?? '').localeCompare(b[field] ?? '')
                ) * sortMod;
            case 'QuantityOnHand':
            case 'QuantityOrdered':
            case 'QtyRequiredForWO':
            case 'QuantityOnIT':
            case 'QuantityAvailable':
            case 'ActualAvailable':
                return (
                    a[field] === b[field]
                        ? itemWarehouseCompare(a, b)
                        : a[field] - b[field]
                ) * sortMod;
            default:
                return itemWarehouseCompare(a, b);
        }
    };
