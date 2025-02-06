import {ProductLine} from "chums-types";
import {fetchJSON} from "chums-ui-utils";

export async function fetchProductLines():Promise<ProductLine[]> {
    try {
        const url ='/api/search/prodline/chums/';
        const res = await fetchJSON<{result: ProductLine[]}>(url, {cache: 'no-cache'});
        return res?.result ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchProductLines()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchProductLines()", err);
        return Promise.reject(new Error('Error in fetchProductLines()'));
    }
}
