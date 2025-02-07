import {api} from './api'
import {ProductLine} from "chums-types";

interface ProductLineResponse {
    result: ProductLine[];
}

export const productLineApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProductLines: build.query<ProductLine[], void>({
            query: () => '/api/search/prodline/chums',
            transformResponse: (response: ProductLineResponse) => response.result ?? [],
            providesTags: () => [{type: 'ProductLine'}],
        })
    })
});

export const {useGetProductLinesQuery} = productLineApi;
