import React from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import SignIn from './signIn/signIn';
import SignUp from './signUp/signUp';
import RegisterEntry from '../registerEntry/registerEntry';

const matchType = PropTypes.shape({
  url: PropTypes.string.isRequired,
});

function RegisterRoot({ match }) {
  const authorization = true;
  return (
    <Switch>
      <Route path={`${match.url}/signIn`} component={SignIn} />
      <Route path="/register/entry" component={RegisterEntry} />
      {authorization ? <Route path={`${match.url}/signUp`} component={SignUp} /> : <Redirect to="/register/entry" />}
      <Route exact path={match.url} component={SignIn} />
    </Switch>
  );
}

RegisterRoot.propTypes = {
  match: matchType.isRequired,
};

function Register({ match }) {
  return (
    <div className="registerContainer">
      <h2 className="registerNav">
        <NavLink to={`${match.url}/signIn`} activeClassName="navActive">
          로그인
        </NavLink>
        /
        <NavLink to={`${match.url}/signUp`} activeClassName="navActive">
          회원가입
        </NavLink>
      </h2>
      <RegisterRoot match={match} />
    </div>
  );
}

Register.propTypes = {
  match: matchType.isRequired,
};

export default Register;
