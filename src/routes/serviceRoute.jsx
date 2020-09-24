import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import ActionBar from "../component/actionBar"
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
import {ProtectedRoute} from "./rootRoute";
import ServiceMain from "../component/serviceMain";

function ServiceRoute() {
  const {SERVICE, SERVICE_BOOK_LIST, SERVICE_ADD_BOOKS, SERVICE_MY_RENT, SERVICE_MEMBER_MANAGEMENT, SERVICE_INQUIRY, SERVICE_SETTING} = ROUTE_PATH;
  return (
    <div className="serviceLayoutContainer">
      <ActionBar />
      <Switch>
        <Route path={SERVICE_BOOK_LIST} component={BookList} />
        <Route path={SERVICE_ADD_BOOKS} component={AddBooks} />
        <Route path={SERVICE_MY_RENT} component={MyRent} />
        <Route path={SERVICE_INQUIRY} component={Inquiry} />
        <Route path={SERVICE_MEMBER_MANAGEMENT} component={MemberManagement} />
        <Route path={SERVICE_SETTING} children={<Setting/>} />
      </Switch>
    </div>
  )
}

export default ServiceRoute
