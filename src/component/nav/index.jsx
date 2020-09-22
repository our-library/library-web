import React from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';

function Index() {

    return (
        <nav className="mainNav">
            <div className="mainLogo">
                <strong>OURLIBRARY</strong>
            </div>
            <ul className="mainMenu">
                <NavLink to="/home" activeClassName="navActive"><li>프로젝트 소개</li></NavLink>
                <NavLink to="/info" activeClassName="navActive"><li>팀 소개</li></NavLink>
                <NavLink to="/register" activeClassName="navActive"><li>로그인/회원가입</li></NavLink>
            </ul>
        </nav>
    )
}

export default Index
