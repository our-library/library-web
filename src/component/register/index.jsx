import React from 'react';
import {NavLink} from 'react-router-dom';
import {useRouteMatch} from "react-router";
import WebLayout from "../../app/layout/webLayout";
import {RegisterRoute} from "../../routes/registerRoute";

function Register() {
  const {url} = useRouteMatch();
  return (
    <WebLayout>
      <div className="registerContainer">
        <h2 className="registerNav">
          <NavLink to={`${url}/signIn`} activeClassName="navActive">로그인</NavLink>
          /<NavLink to={`${url}/signUp`} activeClassName="navActive">회원가입</NavLink></h2>
        <RegisterRoute />
      </div>
    </WebLayout>
  )
}

export default Register;
