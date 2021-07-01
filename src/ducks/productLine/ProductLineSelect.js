import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Select from '../../common-components/Select';

import {fetchProductLines, selectProductLineList, selectProductLine, setProductLine} from "./index";

const ProductLineSelect = () => {
    const dispatch = useDispatch();
    const productLines = useSelector(selectProductLineList);
    const value = useSelector(selectProductLine);

    useEffect(() => {
        console.log('useEffect - dispatching fetchProductLines');
        dispatch(fetchProductLines());
    }, []);


    const onChange = ({field, value}) => {
        dispatch(setProductLine(value));
    }

    return (
        <Select value={value || ''} onChange={onChange}>
            <option value="">ALL</option>
            {productLines
                .filter(pl => pl.active)
                .map(pl => (
                    <option key={pl.ProductLine}
                            value={pl.ProductLine}>{pl.ProductLine} - {pl.ProductLineDesc}</option>
                ))}
        </Select>
    )
}

export default ProductLineSelect;
