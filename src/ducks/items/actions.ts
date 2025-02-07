import {createAsyncThunk} from "@reduxjs/toolkit";
import {BufferedItem} from "@/src/types";
import {fetchItems, FetchItemsProps, postItemBuffer, PostItemBufferProps} from "@/ducks/items/api";
import {RootState} from "@/app/configureStore";
import {selectItemsStatus} from "@/ducks/items/index";

export const saveItemBuffer = createAsyncThunk<BufferedItem | null, PostItemBufferProps, { state: RootState }>(
    'items/saveBuffer',
    async (arg) => {
        return postItemBuffer(arg);
    }
)

export const loadItems = createAsyncThunk<BufferedItem[], FetchItemsProps, { state: RootState }>(
    'items/load',
    async (arg) => {
        return await fetchItems(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectItemsStatus(state) === 'idle';
        }
    }
)
