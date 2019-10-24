import React from 'react';

import './titleBars.scss';

export const TitleBar: React.FC = ({ children }) => (
    <div className="title-bar">{children}</div>
);
