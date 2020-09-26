import React, { useState } from 'react';
import { Redirect, Route } from 'react-router';

import { getToken } from '../utils/handleToken';
import { ROUTE_PATH } from '../constants/path';
import { fetchGroupCount } from '../store/api/groupApi';

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
  const { SERVICE } = ROUTE_PATH;
  const [groupCount, setGroupCount] = useState(0);
  getUserGroupCount().then((result) => setGroupCount(result));

  return (
    <Route
      {...rest}
      render={() => {
        if (isAuthenticated && groupCount === 0) {
          return children;
        }
        return <Redirect to={SERVICE} />;
      }}
    />
  );
}

async function getUserGroupCount() {
  const result = await fetchGroupCount();
  return result;
}
