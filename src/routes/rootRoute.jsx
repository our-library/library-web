import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import Home from '../component/home/home';
import Info from '../component/info/info';
import ForgetPassword from '../component/register/forgetPassword/forgetPassword';
import NotFound from '../component/notFound/notFound';
import BookList from '../component/bookList/booList';
import Register from "../component/register/register";
import RegisterEntry from "../component/registerEntry/registerEntry";
import MyRent from "../component/myRent/myRent";
import Setting from "../component/setting/setting";
import MakeGroup from "../component/registerEntry/makeGroup/makeGroup";
import {getToken} from "../utils/handleToken/handleToken";
import {useEffect} from "react";
import {useState} from "react";


function RootRoute() {
  return (
    <Switch>
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
      <ProtectedRoute path='/service/bookList'>
        <BookList />
      </ProtectedRoute>
      <ProtectedRoute path='/service/setting'>
        <Setting />
      </ProtectedRoute>
      <ProtectedRoute path='/service/myRent'>
        <MyRent />
      </ProtectedRoute>
      <Redirect from='/service' to='/service/bookList'/>
      <Redirect path="*" to="/"/>
      <Route component={NotFound}/>
    </Switch>
  )
}

function ProtectedRoute({children, ...rest}) {
  // const [isAuthenticated, setIsAuthenticated] = useState(null);
  const isAuthenticated = getToken();

  // useEffect(() => {
  //   const token = getToken();
  //   console.log(token);
  //   setIsAuthenticated(token);
  //   return function cleanup() {
  //     getToken();
  //   }
  // },);

  return (
    <Route
      {...rest}
      render={() => isAuthenticated ? children : <Redirect to='/register/signIn'/>}
    />
  )
}

export default RootRoute
