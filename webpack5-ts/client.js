import React from 'react';
import { render } from 'react-dom';
import App from '@layouts/App';
import { BrowserRouter } from 'react-router-dom';
render(React.createElement(BrowserRouter, null,
    React.createElement(App, null)), document.querySelector('#app'));
//# sourceMappingURL=client.js.map