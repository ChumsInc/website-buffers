import {ProductLine, SortProps} from "chums-types";

export const productLineSorter = (sort?:SortProps<ProductLine>) => (a:ProductLine, b:ProductLine) => {
    const sortMod = (sort?.ascending ?? true) ? 1 : -1;
    switch(sort?.field) {
        case 'ProductLine':
        default:
            return a.ProductLine.toLowerCase().localeCompare(b.ProductLine.toLowerCase()) * sortMod;
    }
}
