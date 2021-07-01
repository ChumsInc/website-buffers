import React from 'react';
import {useSelector} from 'react-redux';
import {setPage, setRowsPerPage, selectRowsPerPage, selectCurrentPage} from 'chums-ducks/dist/ducks/page';
import ConnectedRowsPerPage from 'chums-ducks/dist/ducks/page/ConnectedRowsPerPage';
import ConnectedPagination from 'chums-ducks/dist/ducks/page/ConnectedPagination';
import {selectList} from "../ducks/items";

const PaginatedItemList = () => {
    const length = useSelector(selectList).length;
    return (
        <>
         <div className="row g-3">
             <div className="col-auto">
                 <label className="form-label">Rows Per Page</label>
                 <ConnectedRowsPerPage />
             </div>
             <div className="col-auto">
                 <label className="form-label">Page</label>
                 <ConnectedPagination dataLength={length} />
             </div>
         </div>
        </>
    )
}

