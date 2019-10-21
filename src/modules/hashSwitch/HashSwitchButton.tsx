import React from 'react';

interface HashSwitchButtonProps {
    hashOption: string;
    currentHash: string;
}

export const HashSwitchButton: React.FC<HashSwitchButtonProps> = ({
    hashOption,
    currentHash,
}) => {
    const trimmedHash = hashOption.substring(1, hashOption.length);

    const handleOnClick = () => {
        window.location.hash = trimmedHash;
    };

    const className = `hash-switch-button${
        hashOption === currentHash ? ' active' : ''
    }`;

    return (
        <div className={className} onClick={handleOnClick}>
            {trimmedHash}
        </div>
    );
};
