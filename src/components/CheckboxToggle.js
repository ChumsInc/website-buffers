import React from 'react';

const CheckboxToggle = ({label = '', checked, onChange}) => {
    return (
        <div className="form-check form-check-inline">
            <label className="form-check-label">
                <input className="form-check-input" type="checkbox" checked={checked} onChange={() => onChange(!checked)} />
                {label}
            </label>
        </div>
    )
};

export default CheckboxToggle;
