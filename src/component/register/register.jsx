import React, {useState} from 'react';
import SignIn from './signIn/signIn';
import {Link, NavLink, Redirect, Route, Switch} from 'react-router-dom';
import SignUp from './signUp/signUp';
import ForgetPassword from './forgetPassword/forgetPassword';
import RegisterEntry from '../registerEntry/registerEntry';

function RegisterRoot({match}) {
  const authorization = true;
  return (
    <Switch>
      <Route path={`${match.url}/signIn`} component={SignIn}/>
      <Route path='/register/entry' component={RegisterEntry}/>
      { authorization ?
        <Route path={`${match.url}/signUp`} component={SignUp}/>
        : <Redirect to='/register/entry'/>
      }
      <Route exact path={match.url} component={SignIn}/>
    </Switch>
  )
}

function Register({match}) {
  return (
    <div className="registerContainer">
      <h2 className="registerNav">
        <NavLink to={`${match.url}/signIn`} activeClassName="navActive">로그인</NavLink>
        /<NavLink to={`${match.url}/signUp`} activeClassName="navActive">회원가입</NavLink></h2>
      <RegisterRoot match={match}/>
    </div>
  )
}

export default Register;
