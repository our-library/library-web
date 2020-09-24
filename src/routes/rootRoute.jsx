import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import ForgetPassword from '../component/register/forgetPassword/forgetPassword';
import NotFound from '../component/notFound/notFound';
import BookList from '../component/bookList';
import RegisterEntry from "../component/registerEntry";
import MakeGroup from "../component/registerEntry/makeGroup";
import {getToken} from "../utils/handleToken";
import Home from "../component/home";
import Info from "../component/info";
import Register from "../component/register";
import Setting from "../component/setting";
import MyRent from "../component/myRent";
import {ROUTE_PATH} from "../constants/path";
import AddBooks from "../component/addBooks";
import MemberManagement from "../component/memberManagement";
import Inquiry from "../component/inquiry";
import CreateConfirmModal from "../component/modal/CreateConfirmModal";
import {useLocation} from "react-router";

function RootRoute() {
  const location = useLocation();
  let background = location.state && location.state.background;
  console.log(location.state);

  const {SERVICE, SERVICE_BOOK_LIST, SERVICE_ADD_BOOKS, SERVICE_MY_RENT, SERVICE_MEMBER_MANAGEMENT, SERVICE_INQUIRY, SERVICE_SETTING} = ROUTE_PATH;
  return (
    <div>
      <Switch location={background || location}>
        <Route exact path="/" component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/info" component={Info}/>
        <Route path="/register" component={Register}/>
        <Route path='/forgetPassword' component={ForgetPassword}/>
        <ProtectedRoute path='/registerEntry'>
          <RegisterEntry />
        </ProtectedRoute>
        <ProtectedRoute path='/makeGroup'>
          <MakeGroup />
        </ProtectedRoute>
        <ProtectedRoute path={SERVICE_BOOK_LIST}>
          <BookList/>
        </ProtectedRoute>
        <ProtectedRoute path={SERVICE_ADD_BOOKS}>
          <AddBooks/>
        </ProtectedRoute>
        <ProtectedRoute path={SERVICE_MY_RENT}>
          <MyRent />
        </ProtectedRoute>
        <ProtectedRoute path={SERVICE_INQUIRY}>
          <Inquiry/>
        </ProtectedRoute>
        <ProtectedRoute path={SERVICE_MEMBER_MANAGEMENT}>
          <MemberManagement/>
        </ProtectedRoute>
        <ProtectedRoute path={SERVICE_SETTING}>
          <Setting />
        </ProtectedRoute>
        <ProtectedRoute path='/service/modal/:id'>
          <CreateConfirmModal />
        </ProtectedRoute>
        <Redirect from={SERVICE} to={SERVICE_BOOK_LIST} />
        <Redirect path="*" to="/"/>
        <Route component={NotFound}/>
      </Switch>

      {background && <Route path="/service/modal/:id" children={<CreateConfirmModal />} />}

    </div>
  )
}

export function ProtectedRoute({children, ...rest}) {
  const isAuthenticated = getToken();

  return (
    <Route
      {...rest}
      render={() => isAuthenticated ? children : <Redirect to='/register/signIn'/>}
    />
  )
}

export default RootRoute
