import React from 'react';

import './button.scss';

interface ButtonProps {
    block?: boolean;
    onClick: Function;
}

export const Button: React.FC<ButtonProps> = ({
    block = false,
    onClick,
    children,
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
