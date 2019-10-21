import React from 'react';

interface TabProps {
    className: string;
    hash: string;
    currentHash: string;
}

export const Tab: React.FC<TabProps> = ({
    className,
    hash,
    currentHash,
    children,
}) => {
    const tabClassName = `${className}${
        hash === currentHash ? ' visible' : ''
    }`;

    return <div className={tabClassName}>{children}</div>;
};
