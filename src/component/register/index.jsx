import React from 'react';
import { NavLink } from 'react-router-dom';

import WebLayout from '../../app/layout/webLayout';
import { RegisterRoute } from '../../routes/registerRoute';
import { ROUTE_PATH } from '../../constants/path';

function Register() {
  const { SIGN_IN, SIGN_UP } = ROUTE_PATH;

  return (
    <WebLayout>
      <div className="registerContainer">
        <h2 className="registerNav">
          <NavLink to={SIGN_IN} activeClassName="navActive">
            로그인
          </NavLink>
          /
          <NavLink to={SIGN_UP} activeClassName="navActive">
            회원가입
          </NavLink>
        </h2>
        <RegisterRoute />
      </div>
    </WebLayout>
  );
}

export default Register;
