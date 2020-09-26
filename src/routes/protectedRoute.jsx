import React from 'react';
import { Redirect, Route } from 'react-router';

import { getToken } from '../utils/handleToken';
import { getGroupCount } from '../utils/handleUser';

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

  return (
    <Route
      {...rest}
      render={() => {
        if (isAuthenticated && userGroupCount === 0) {
          return children;
        }
        return <Redirect to="/service" />;
      }}
    />
  );
}
