import React from 'react';

import './title.scss';

interface TitleProps {
    light?: boolean;
}

export const Title: React.FC<TitleProps> = ({ children, light = false }) => {
    const className = `title${light ? ' light' : ''}`;

    return <span className={className}>{children}</span>;
};
