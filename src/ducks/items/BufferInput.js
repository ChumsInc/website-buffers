import React, {useState, memo} from 'react';
import {useDispatch} from 'react-redux';
import {saveBuffer} from './index';
import classNames from 'classnames';

const BufferInput = ({Company = 'chums', ItemCode = '', WarehouseCode = '', buffer = 0, saving = false}) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(buffer || 0);
    const changed = value !== (buffer || 0);

    const onSave = (ev) => {
        ev.preventDefault();
        dispatch(saveBuffer({Company, ItemCode, WarehouseCode, buffer: Number(value)}));
    }

    const onChange = (ev) => {
        setValue(Number(ev.target.value || 0));
    }

    const btnClassName = {
        'btn': true,
        'btn-outline-secondary': !changed,
        'btn-primary': changed,
    };
    return (
        <form className="input-group input-group-sm buffer-input">
            <input type="number" value={value || ''} onChange={onChange} className="form-control form-control-sm" disabled={saving}/>
            <button type="submit" className={classNames(btnClassName)} disabled={!changed || saving}
                    onClick={onSave}>
                {saving ? 'Saving' : 'Save'}
            </button>
        </form>

    );
}
export default memo(BufferInput);
