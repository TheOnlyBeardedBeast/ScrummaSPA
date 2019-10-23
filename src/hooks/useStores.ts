import React from 'react';
import storeContext from 'stores/StoreContext';

export const useStores = () => React.useContext(storeContext);
