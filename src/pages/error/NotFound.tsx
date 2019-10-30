import React from 'react';
import { Title } from 'components';

import './error.scss';

export const NotFound: React.FC = () => (
    <div className="error">
        <Title>Oops page not found :(</Title>
    </div>
);
