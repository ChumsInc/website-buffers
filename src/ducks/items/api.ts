import {BufferedItem} from "@/src/types";
import {fetchJSON} from "chums-ui-utils";

export const URL_FETCH_ITEMS = '/api/operations/production/buffer/chums/:itemCode?:params';
export const URL_POST_BUFFER = '/api/operations/production/buffer/chums/:itemCode/:warehouseCode';

export interface FetchItemsProps {
    itemCode?: string | null;
    productLine?: string | null;
}

export async function fetchItems(arg: FetchItemsProps): Promise<BufferedItem[]> {
    try {
        const params = new URLSearchParams();
        if (arg.productLine) {
            params.set("productLine", arg.productLine);
        }
        const url = URL_FETCH_ITEMS.replace(':itemCode', encodeURIComponent(arg.itemCode ?? ''))
            .replace(':params', params.toString());
        const res = await fetchJSON<{ buffers: BufferedItem[] }>(url, {cache: 'no-cache'});
        return res?.buffers ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchItems()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchItems()", err);
        return Promise.reject(new Error('Error in fetchItems()'));
    }
}

export type PostItemBufferProps = Pick<BufferedItem, 'id' | 'ItemCode' | 'WarehouseCode' | 'buffer'>;

export async function postItemBuffer(arg: PostItemBufferProps): Promise<BufferedItem | null> {
    try {
        const url = URL_POST_BUFFER
            .replace(':itemCode', encodeURIComponent(arg.ItemCode))
            .replace(':warehouseCode', encodeURIComponent(arg.WarehouseCode));
        const body = JSON.stringify({buffer: arg.buffer});
        const res = await fetchJSON<{ buffer: BufferedItem | null }>(url, {cache: 'no-cache', method: 'POST', body});
        return res?.buffer ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("postItemBuffer()", err.message);
            return Promise.reject(err);
        }
        console.debug("postItemBuffer()", err);
        return Promise.reject(new Error('Error in postItemBuffer()'));
    }
}
