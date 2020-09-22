import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import Index from '../component/home';
import Index from '../component/info';
import ForgetPassword from '../component/register/forgetPassword/forgetPassword';
import NotFound from '../component/notFound/notFound';
import BookList from '../component/bookList';
import Index from "../component/register";
import RegisterEntry from "../component/registerEntry/registerEntry";
import Index from "../component/myRent";
import Index from "../component/setting";
import MakeGroup from "../component/registerEntry/makeGroup/makeGroup";
import {getToken} from "../utils/handleToken";
import {useEffect} from "react";
import {useState} from "react";


function RootRoute() {
  return (
    <Switch>
      <Route exact path="/" component={Index}/>
      <Route path="/home" component={Index}/>
      <Route path="/info" component={Index}/>
      <Route path="/register" component={Index}/>
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
        <Index />
      </ProtectedRoute>
      <ProtectedRoute path='/service/myRent'>
        <Index />
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
