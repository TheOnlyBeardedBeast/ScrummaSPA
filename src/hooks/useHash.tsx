import React, { useEffect, useState } from 'react';

export const useHash = (hashoptions: Array<string>, defaultHash: string) => {
    const [hash, setHash] = useState<string>(defaultHash);

    const handleHashChange = () => {
        const hash: string = window.location.hash || defaultHash;

        if (hashoptions.includes(hash)) {
            setHash(hash);
        }
    };

    useEffect(() => {
        window.addEventListener('hashchange', handleHashChange, false);
        return () =>
            window.removeEventListener('hashchange', handleHashChange, false);
    });

    return hash;
};
