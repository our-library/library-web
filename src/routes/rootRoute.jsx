import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router';
import { ROUTE_PATH } from '../constants/path';
import { getGroupCount } from '../utils/handleUser';

import { getToken } from '../utils/handleToken';
import ForgetPassword from '../component/register/forgetPassword/forgetPassword';
import NotFound from '../component/notFound/notFound';
import RegisterEntry from '../component/registerEntry';
import MakeGroup from '../component/registerEntry/makeGroup';
import Home from '../component/home';
import Info from '../component/info';
import Register from '../component/register';
import ServiceMain from "../component/serviceMain";
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

        <RegisterProtectedPage path="/registerEntry" children={<RegisterEntry />} />
        <RegisterProtectedPage path="/makeGroup" children={<MakeGroup/>} />

        <ProtectedRoute path={SERVICE} children={<ServiceMain />} />
        <ProtectedRoute path="/service/modal/:id" children={<CreateConfirmModal />} />
        <Redirect path="*" to="/"/>
        <Route component={NotFound}/>
      </Switch>

      {background && (
        <Route path="/service/modal/:id" children={<CreateConfirmModal />} />
      )}
    </div>
  );
}

export function ProtectedRoute({children, ...rest}) {
  const isAuthenticated = getToken();

  return (
    <Route
      {...rest}
      render={() => (isAuthenticated ? children : <Redirect to="/register/signIn" />)}
    />
  );
}

function RegisterProtectedPage({children, ...rest}) {
  const isAuthenticated = getToken();
  const userGroupCount = getGroupCount();

  return (
    <Route
      {...rest}
      render={() => (isAuthenticated && userGroupCount === 0) ? children : <Redirect to="/service" />}
    />
    )
}

export default RootRoute;
