import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATH } from '../../constants/path';

function Nav() {
  const { REGISTER, HOME, INFO } = ROUTE_PATH;

  return (
    <nav className="mainNav">
      <div className="mainLogo">
        <strong>OURLIBRARY</strong>
      </div>
      <ul className="mainMenu">
        <NavLink to={HOME} activeClassName="navActive">
          <li>프로젝트 소개</li>
        </NavLink>
        <NavLink to={INFO} activeClassName="navActive">
          <li>팀 소개</li>
        </NavLink>
        <NavLink to={REGISTER} activeClassName="navActive">
          <li>로그인/회원가입</li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default Nav;
