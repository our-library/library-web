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
import InvitationCodeModal from '../component/modal/invitationCodeModal';
import BookRentModal from '../component/modal/bookRentModal';

function RootRoute() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const { SERVICE, REGISTER, MAKE_GROUP, REGISTER_ENTRY, FORGET_PASSWORD, HOME, INFO } = ROUTE_PATH;

  return (
    <div>
      <Switch location={background || location}>
        <Route exact path="/" component={Home} />
        <Route path={HOME} component={Home} />
        <Route path={INFO} component={Info} />
        <Route path={REGISTER} component={Register} />
        <Route path={FORGET_PASSWORD} component={ForgetPassword} />

        <RegisterProtectedPage path={REGISTER_ENTRY}>
          <RegisterEntry />
        </RegisterProtectedPage>
        <RegisterProtectedPage path={MAKE_GROUP}>
          <MakeGroup />
        </RegisterProtectedPage>

        <ProtectedRoute path={SERVICE}>
          <ServiceMain />
        </ProtectedRoute>

        <Redirect path="*" to="/" />
        <Route component={NotFound} />
      </Switch>
      {background && (
        <ProtectedRoute path="/service/book-list/:id">
          <BookRentModal />
        </ProtectedRoute>
      )}
      {background && (
        <ProtectedRoute path="/service/modal/:id">
          <InvitationCodeModal />
        </ProtectedRoute>
      )}
    </div>
  );
}

export default RootRoute;
