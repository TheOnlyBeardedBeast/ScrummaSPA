import React, { ChangeEvent } from 'react';

import './switch.scss';

interface SwitchProps {
    checked: boolean;
    onChange?: Function;
    label: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, label }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event);
    };

    return (
        <label className="scrumma-switch">
            <span className="label">{label}</span>
            <input type="checkbox" checked={checked} onChange={handleChange} />
            <span className="slider round" />
        </label>
    );
};
