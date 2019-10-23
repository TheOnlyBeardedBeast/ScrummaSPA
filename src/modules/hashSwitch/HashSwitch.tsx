import React from 'react';

import { HashSwitchButton } from './HashSwitchButton';

import './hashSwitch.scss';

interface HashSwitchProps {
    hashOptions: Array<string>;
    currentHash: string;
}

export const HashSwitch: React.FC<HashSwitchProps> = ({
    hashOptions,
    currentHash,
}) => {
    const renderHashItems = () =>
        hashOptions.map((hash, index) => (
            <HashSwitchButton
                key={index}
                hashOption={hash}
                currentHash={currentHash}
            />
        ));

    return <div className="hash-switch">{renderHashItems()}</div>;
};
