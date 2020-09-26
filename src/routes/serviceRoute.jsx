import * as React from 'react';
import { Switch } from 'react-router-dom';
import { SERVICE_ROUTE_PATH } from '../constants/path';
import { ProtectedRoute } from './rootRoute';
import ServiceMain from '../component/serviceMain';

function ServiceRoute() {
  const { SERVICE } = SERVICE_ROUTE_PATH;
  return (
    <Switch>
      <ProtectedRoute path={SERVICE}>
        <ServiceMain />
      </ProtectedRoute>
    </Switch>
  );
}

export default ServiceRoute;
