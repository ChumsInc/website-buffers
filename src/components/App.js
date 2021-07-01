import React, {Fragment} from 'react';
import AppControlBar from "./AppControlBar";
import {AlertList, Alert} from "chums-ducks";
import ItemList from "../ducks/items/ItemList";
import {BrowserRouter as Router} from "react-router-dom";
import ErrorBoundary from "../common-components/ErrorBoundary";


const App = ({}) => {
    return (
        <Fragment>
            <AlertList/>
            <Router basename="/apps/website-buffers/">
                <ErrorBoundary>
                    <AppControlBar/>
                </ErrorBoundary>
            </Router>

            <ErrorBoundary>
                <ItemList/>
            </ErrorBoundary>
            <Alert color="info">
                <h4 className="alert-heading">Updates</h4>
                <hr />
                <p>Updating the buffer now takes longer because the updated item quantity is now sent to the various
                    websites that sell that item.</p>
                <p>You can still update other buffers while a buffer is saving.</p>
            </Alert>
        </Fragment>
    )
};

export default App;
