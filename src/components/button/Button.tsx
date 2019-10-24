import React from 'react';

import './button.scss';

interface ButtonProps {
    block?: boolean;
    onClick?: Function;
    type?: 'button' | 'reset' | 'submit';
    tabIndex?: number;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    block = false,
    onClick,
    children,
    type = 'button',
    tabIndex,
    className: propClassname,
}) => {
    const className = `scrumma-button${block ? ' block' : ''}${
        propClassname ? ` ${propClassname}` : ''
    }`;

    const handleOnClick = () => {
        onClick && onClick();
    };

    return (
        <button
            className={className}
            onClick={handleOnClick}
            tabIndex={tabIndex}
            type={type}
        >
            {children}
        </button>
    );
};
