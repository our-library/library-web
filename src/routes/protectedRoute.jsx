import React from 'react';
import { Redirect, Route } from 'react-router';

import { getToken } from '../utils/handleToken';
import { getGroupCount } from '../utils/handleUser';
import { ROUTE_PATH } from '../constants/path';

export function ProtectedRoute({ children, ...rest }) {
  const isAuthenticated = getToken();

  return (
    <Route
      {...rest}
      render={() => (isAuthenticated ? children : <Redirect to="/register/signIn" />)}
    />
  );
}

export function RegisterProtectedPage({ children, ...rest }) {
  const isAuthenticated = getToken();
  const userGroupCount = getGroupCount();
  const { SERVICE } = ROUTE_PATH;

  return (
    <Route
      {...rest}
      render={() => {
        if (isAuthenticated && userGroupCount === 0) {
          return children;
        }
        return <Redirect to={SERVICE} />;
      }}
    />
  );
}
