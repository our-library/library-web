import * as React from 'react';
import { Switch } from 'react-router-dom';
import { ROUTE_PATH } from '../constants/path';
import { ProtectedRoute } from './rootRoute';
import ServiceMain from '../component/serviceMain';

function ServiceRoute() {
  const { SERVICE } = ROUTE_PATH;
  return (
    <Switch>
      <ProtectedRoute path={SERVICE}>
        <ServiceMain />
      </ProtectedRoute>
    </Switch>
  );
}

export default ServiceRoute;
