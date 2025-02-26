import {api} from './api';

interface VersionResponse {
    name: string;
    version?: string;
}

export const versionApi = api.injectEndpoints({
    endpoints: (build) => ({
        getVersion: build.query<string, void>({
            query: () => './package.json',
            transformResponse: (response: VersionResponse) => response.version ?? 'N/A',
            providesTags: () => [{type: 'Version'}]
        })
    })
})

export const {useGetVersionQuery, useLazyGetVersionQuery} = versionApi;
