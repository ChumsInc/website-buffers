import React from 'react';
import AlertList from "@/components/alerts/AlertList";
import {ErrorBoundary} from "react-error-boundary";
import ErrorBoundaryFallbackAlert from "@/components/ErrorBoundaryFallbackAlert";
import AppControlBar from "@/components/AppControlBar";
import Alert from "react-bootstrap/Alert";
import ItemList from "@/ducks/items/ItemList";
import ItemsProgressBar from "@/ducks/items/ItemsProgressBar";

const App = () => {
    return (
        <React.StrictMode>
            <AlertList/>
            <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
                <AppControlBar/>
                <ItemsProgressBar />
                <ItemList/>
            </ErrorBoundary>
            <Alert variant="info">
                <div className="alert-heading">Updates</div>
                <hr />
                <p>Updating the buffer now takes longer because the updated item quantity is now sent to the various
                    websites that sell that item.</p>
                <p>You can still update other buffers while a buffer is saving.</p>
            </Alert>
        </React.StrictMode>
    )
}

export default App;
