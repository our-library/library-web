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
import BookDetail from '../component/bookList/bookDetail';
import SelectDepartment from '../component/registerEntry/selectDepartment';

function ServiceRoute() {
  const {
    SERVICE,
    SERVICE_BOOK_LIST,
    SERVICE_ADD_BOOKS,
    SERVICE_MY_RENT,
    SERVICE_MEMBER_MANAGEMENT,
    SERVICE_INQUIRY,
    SERVICE_SETTING,
    SERVICE_BOOK_LIST_BOOK_ID,
    SERVICE_SELECT_DEPARTMENT,
  } = ROUTE_PATH;

  return (
    <Switch>
      <ProtectedRoute path={SERVICE_BOOK_LIST_BOOK_ID}>
        <BookDetail />
      </ProtectedRoute>

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

      <ProtectedRoute path={SERVICE_SELECT_DEPARTMENT}>
        <SelectDepartment />
      </ProtectedRoute>

      <Redirect from={SERVICE} to={SERVICE_BOOK_LIST} />
    </Switch>
  );
}

export default ServiceRoute;
