import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router';
import { ROUTE_PATH } from '../constants/path';
import { ProtectedRoute, RegisterProtectedPage } from './protectedRoute';

import ForgetPassword from '../component/register/forgetPassword/forgetPassword';
import NotFound from '../component/notFound/notFound';
import RegisterEntry from '../component/registerEntry';
import MakeGroup from '../component/registerEntry/makeGroup';
import Home from '../component/home';
import Info from '../component/info';
import Register from '../component/register';
import ServiceMain from '../component/serviceMain';
import CreateConfirmModal from '../component/modal/CreateConfirmModal';

function RootRoute() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const { SERVICE } = ROUTE_PATH;

  return (
    <div>
      <Switch location={background || location}>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/info" component={Info} />
        <Route path="/register" component={Register} />
        <Route path="/forgetPassword" component={ForgetPassword} />

        <RegisterProtectedPage path="/registerEntry">
          <RegisterEntry />
        </RegisterProtectedPage>
        <RegisterProtectedPage path="/makeGroup">
          <MakeGroup />
        </RegisterProtectedPage>

        <ProtectedRoute path={SERVICE}>
          <ServiceMain />
        </ProtectedRoute>
        <ProtectedRoute path="/service/modal/:id">
          <CreateConfirmModal />
        </ProtectedRoute>
        <Redirect path="*" to="/" />
        <Route component={NotFound} />
      </Switch>
      {background && (
        <Route path="/service/modal/:id">
          <CreateConfirmModal />
        </Route>
      )}
    </div>
  );
}

export default RootRoute;
