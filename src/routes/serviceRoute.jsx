import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import ForgetPassword from '../component/register/forgetPassword/forgetPassword';
import NotFound from '../component/notFound/notFound';
import BookList from '../component/bookList';
import RegisterEntry from "../component/registerEntry";
import MakeGroup from "../component/registerEntry/makeGroup/makeGroup";
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
import {ProtectedRoute} from "./rootRoute";
import ServiceMain from "../component/serviceMain";

function ServiceRoute() {
  const {SERVICE, SERVICE_BOOK_LIST, SERVICE_ADD_BOOKS, SERVICE_MY_RENT, SERVICE_MEMBER_MANAGEMENT, SERVICE_INQUIRY, SERVICE_SETTING} = ROUTE_PATH;
  return (
    <Switch>
      <ProtectedRoute path={SERVICE}>
        <ServiceMain />
      </ProtectedRoute>
      {/*<ProtectedRoute path={SERVICE_BOOK_LIST}>*/}
      {/*  <BookList/>*/}
      {/*</ProtectedRoute>*/}
      {/*<ProtectedRoute path={SERVICE_ADD_BOOKS}>*/}
      {/*  <AddBooks/>*/}
      {/*</ProtectedRoute>*/}
      {/*<ProtectedRoute path={SERVICE_MY_RENT}>*/}
      {/*  <MyRent />*/}
      {/*</ProtectedRoute>*/}
      {/*<ProtectedRoute path={SERVICE_INQUIRY}>*/}
      {/*  <Inquiry/>*/}
      {/*</ProtectedRoute>*/}
      {/*<ProtectedRoute path={SERVICE_MEMBER_MANAGEMENT}>*/}
      {/*  <MemberManagement/>*/}
      {/*</ProtectedRoute>*/}
      {/*<ProtectedRoute path={SERVICE_SETTING}>*/}
      {/*  <Setting />*/}
      {/*</ProtectedRoute>*/}
      {/*<Redirect from={SERVICE} to={SERVICE_BOOK_LIST} />*/}
    </Switch>
  )
}

export default ServiceRoute
