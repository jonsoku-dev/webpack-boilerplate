import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
// 페이지별로 코드스플리팅을 하는 것이 좋다.
var LogIn = loadable(function () { return import('@pages/Login'); });
var SignUp = loadable(function () { return import('@pages/SignUp'); });
var App = function () {
    return (React.createElement(Switch, null,
        React.createElement(Redirect, { exact: true, path: '/', to: '/login' }),
        React.createElement(Route, { path: '/login', component: LogIn }),
        React.createElement(Route, { path: '/signup', component: SignUp })));
};
export default App;
//# sourceMappingURL=App.js.map