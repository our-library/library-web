import { Redirect, Route, Switch } from 'react-router';
import React from 'react';

import SignIn from '../component/register/signIn';
import SignUp from '../component/register/signUp';
import { ROUTE_PATH } from '../constants/path';

export function RegisterRoute() {
  const { SIGN_IN, SIGN_UP, REGISTER } = ROUTE_PATH;
  return (
    <Switch>
      <Route path={SIGN_IN} component={SignIn} />
      <Route path={SIGN_UP} component={SignUp} />
      <Redirect from={REGISTER} to={SIGN_IN} />
    </Switch>
  );
}
