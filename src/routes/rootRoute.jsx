import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../component/home/home';
import Info from '../component/info/info';
import ForgetPassword from '../component/register/forgetPassword/forgetPassword';
import NotFound from '../component/notFound/notFound';
import BookList from '../component/bookList/booList';
import Register from '../component/register/register';

function RootRoute() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/info" component={Info} />
      <Route path="/register" component={Register} />
      <Route path="/forgetPassword" component={ForgetPassword} />
      <Route path="/bookList" component={BookList} />
      <Redirect path="*" to="/" />
      <Route component={NotFound} />
    </Switch>
  );
}

export default RootRoute;
