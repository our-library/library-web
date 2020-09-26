import * as React from 'react';
import { Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import { ROUTE_PATH } from '../constants/path';

import BookList from '../component/bookList';
import AddBooks from '../component/addBooks';
import MyRent from '../component/myRent';
import Inquiry from '../component/inquiry';
import MemberManagement from '../component/memberManagement';
import Setting from '../component/setting';
import { ProtectedRoute } from './protectedRoute';

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
      <Redirect from={SERVICE} to={SERVICE_BOOK_LIST} />
    </Switch>
  );
}

export default ServiceRoute;
