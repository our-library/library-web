import * as React from 'react';
import { Switch } from 'react-router-dom';
import { ROUTE_PATH } from '../constants/path';
import { ProtectedRoute } from './rootRoute';
import {Redirect} from "react-router";

import BookList from "../component/bookList";
import AddBooks from "../component/addBooks";
import MyRent from "../component/myRent";
import Inquiry from "../component/inquiry";
import MemberManagement from "../component/memberManagement";
import Setting from "../component/setting";

function ServiceRoute() {
  const {
    SERVICE,
    SERVICE_BOOK_LIST,
    SERVICE_ADD_BOOKS,
    SERVICE_MY_RENT,
    SERVICE_MEMBER_MANAGEMENT,
    SERVICE_INQUIRY,
    SERVICE_SETTING,
  } = ROUTE_PATH;

  return (
    <Switch>
      <ProtectedRoute path={SERVICE_BOOK_LIST} children={<BookList />} />
      <ProtectedRoute path={SERVICE_ADD_BOOKS} children={<AddBooks />} />
      <ProtectedRoute path={SERVICE_MY_RENT} children={<MyRent />} />
      <ProtectedRoute path={SERVICE_INQUIRY} children={<Inquiry />} />
      <ProtectedRoute path={SERVICE_MEMBER_MANAGEMENT} children={<MemberManagement />} />
      <ProtectedRoute path={SERVICE_SETTING} children={<Setting />} />
      <Redirect from={SERVICE} to={SERVICE_BOOK_LIST} />
    </Switch>
  );
}

export default ServiceRoute;
