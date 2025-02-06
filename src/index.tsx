import React from 'react';
import {Provider} from 'react-redux';
import App from '@/app/App';
import store from '@/app/configureStore'
import {createRoot} from "react-dom/client";
import type XLSX from 'xlsx'
import type download from 'downloadjs';

declare global {
    interface Window {
        XLSX: typeof XLSX;
        download: typeof download;
    }
}

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
