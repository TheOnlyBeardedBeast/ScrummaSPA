import React from 'react';

import './button.scss';

interface ButtonProps {
    block?: boolean;
    onClick?: Function;
    type?: 'button' | 'reset' | 'submit';
}

export const Button: React.FC<ButtonProps> = ({
    block = false,
    onClick,
    children,
    type = 'button',
}) => {
    const className = `scrumma-button${block ? ' block' : ''}`;

    const handleOnClick = () => {
        onClick && onClick();
    };

    return (
        <button className={className} onClick={handleOnClick}>
            {children}
        </button>
    );
};
