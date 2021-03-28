import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

// 페이지별로 코드스플리팅을 하는 것이 좋다.
const LogIn = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));

const App = () => {
  return (
    <Switch>
      <Redirect exact path={'/'} to={'/login'} />
      <Route path={'/login'} component={LogIn} />
      <Route path={'/signup'} component={SignUp} />
    </Switch>
  );
};

export default App;
