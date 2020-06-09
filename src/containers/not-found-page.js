// @packages
import React from 'react';

// @scripts
import NotFoundPage from '../pages/not-found-page';
import { config } from '../config';

const NotFoundPageContainer = () =>
    <NotFoundPage content={config.text.notFoundPage.content} />;

export default NotFoundPageContainer;
