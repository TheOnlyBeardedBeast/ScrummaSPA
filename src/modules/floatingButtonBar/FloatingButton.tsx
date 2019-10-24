import React from 'react';

interface FloatingButtonProps {
    onClick?: Function;
    name?: string;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
    onClick,
    name,
    children,
}) => {
    const handleOnClick = () => {
        onClick && onClick();
    };

    const className = `floating-button${name ? `-${name}` : ''}`;

    return (
        <button className={className} onClick={handleOnClick}>
            {children}
        </button>
    );
};
