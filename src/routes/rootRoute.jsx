import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router';
import ForgetPassword from '../component/register/forgetPassword/forgetPassword';
import NotFound from '../component/notFound/notFound';
import BookList from '../component/bookList';
import RegisterEntry from '../component/registerEntry';
import MakeGroup from '../component/registerEntry/makeGroup';
import { getToken } from '../utils/handleToken';
import Home from '../component/home';
import Info from '../component/info';
import Register from '../component/register';
import Setting from '../component/setting';
import MyRent from '../component/myRent';
import {REGISTER_ROUTE_PATH, SERVICE_ROUTE_PATH} from '../constants/path';
import AddBooks from '../component/addBooks';
import MemberManagement from '../component/memberManagement';
import Inquiry from '../component/inquiry';
import CreateConfirmModal from '../component/modal/CreateConfirmModal';
import { getGroupCount } from '../utils/handleUser';

function RootRoute() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const {
    SERVICE,
    SERVICE_BOOK_LIST,
    SERVICE_ADD_BOOKS,
    SERVICE_MY_RENT,
    SERVICE_MEMBER_MANAGEMENT,
    SERVICE_INQUIRY,
    SERVICE_SETTING,
  } = SERVICE_ROUTE_PATH;
  const { REGISTER_ENTRY, MAKE_GROUP } = REGISTER_ROUTE_PATH;

  return (
    <div>
      <Switch location={background || location}>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/info" component={Info} />
        <Route path="/register" component={Register} />
        <Route path="/forgetPassword" component={ForgetPassword} />

        <RegisterProtectedPage path={REGISTER_ENTRY}>
          <RegisterEntry />
        </RegisterProtectedPage>
        <RegisterProtectedPage path={MAKE_GROUP}>
          <MakeGroup />
        </RegisterProtectedPage>

        <ProtectedRoute path={SERVICE_BOOK_LIST}>
          <BookList />
        </ProtectedRoute>
        <ProtectedRoute path={SERVICE_ADD_BOOKS}>
          <AddBooks />
        </ProtectedRoute>
        <ProtectedRoute path={SERVICE_MY_RENT}>
          <MyRent />
        </ProtectedRoute>
        <ProtectedRoute path={SERVICE_INQUIRY}>
          <Inquiry />
        </ProtectedRoute>
        <ProtectedRoute path={SERVICE_MEMBER_MANAGEMENT}>
          <MemberManagement />
        </ProtectedRoute>
        <ProtectedRoute path={SERVICE_SETTING}>
          <Setting />
        </ProtectedRoute>
        <ProtectedRoute path="/service/modal/:id">
          <CreateConfirmModal />
        </ProtectedRoute>
        <Redirect from={SERVICE} to={SERVICE_BOOK_LIST} />
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

export function ProtectedRoute({ children, ...rest }) {
  const isAuthenticated = getToken();

  return (
    <Route
      {...rest}
      render={() => (isAuthenticated ? children : <Redirect to="/register/signIn" />)}
    />
  );
}

function RegisterProtectedPage({ children, ...rest }) {
  const isAuthenticated = getToken();
  const userGroupCount = getGroupCount();

  if (isAuthenticated && userGroupCount !== 0) {
    return <Route {...rest}>{children}</Route>;
  }

  return <Redirect to="/service" />;
}

export default RootRoute;
