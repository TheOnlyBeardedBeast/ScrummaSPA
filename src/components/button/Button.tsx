import React from 'react';

import './button.scss';

interface ButtonProps {
    block?: boolean;
    onClick?: Function;
    type?: 'button' | 'reset' | 'submit';
    tabIndex?: number;
}

export const Button: React.FC<ButtonProps> = ({
    block = false,
    onClick,
    children,
    type = 'button',
    tabIndex,
}) => {
    const className = `scrumma-button${block ? ' block' : ''}`;

    const handleOnClick = () => {
        onClick && onClick();
    };

    return (
        <button
            className={className}
            onClick={handleOnClick}
            tabIndex={tabIndex}
        >
            {children}
        </button>
    );
};
