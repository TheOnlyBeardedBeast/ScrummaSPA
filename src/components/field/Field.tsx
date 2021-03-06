import React from 'react';

import './field.scss';

interface FieldProps {
    type: 'text' | 'password' | 'number';
    onChange?: Function;
    block?: boolean;
    value: string | number;
    label: string;
    tabIndex?: number;
}

export const Field: React.FC<FieldProps> = ({
    type,
    block,
    onChange,
    value,
    label,
    tabIndex,
}) => {
    const inputClassName = `scrumma-field${block ? ' block' : ''}`;

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event);
    };

    return (
        <>
            <label className="scrumma-label">{label}</label>
            <input
                tabIndex={tabIndex}
                type={type}
                className={inputClassName}
                onChange={handleOnChange}
                value={value}
            />
        </>
    );
};
