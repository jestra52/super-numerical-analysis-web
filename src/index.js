// @packages
import React from 'react';
import ReactDOM from 'react-dom';

// @scripts
import AppContainer from './containers/app';
import { getElementById } from './util';

// @styles
import './styles/site.css';

ReactDOM.render(
    <AppContainer />,
    getElementById('root')
);
