import * as React from 'react';
import {useState} from "react";
import {removeToken} from "../../utils/handleToken/handleToken";
import {useHistory} from "react-router";
import {NavLink} from "react-router-dom";
import {defaultUserMenu} from "./serviceMenu";

function ActionBar() {
  const history = useHistory();
  const [userMenu, setUserMenu] = useState(defaultUserMenu);

  function logout() {
    removeToken();
    history.replace('/register/signIn');
  }

  return (
    <>
      <nav className="actionBarContainer">
        <div className="">
          <div className="mainLogo">
            <img src="" alt="OURBOOKS-logo"/>
          </div>
          <div className="mainUserInfo">
            <div className="mainUserProfile">
              <img src="" alt="user-profile"/>
            </div>
            <p><strong>양진화</strong></p>
            <div className="profileDescription">
              <small>Product Designer</small>
              <small>YangSongE</small>
            </div>
          </div>
          <div className="bookStatusByUser">
            <div className="statusBox">
              <small className="tag">대여중</small>
              <h6 className="rent"><span>1</span></h6>
            </div>
            <div className="statusBox">
              <small className="tag">연체됨</small>
              <h6 className="overdue">4</h6>
            </div>
          </div>
          <div className="invitePeople">
            <button
              className="Btn-sm Btn-transparent"
            >구성원 초대하기
            </button>
          </div>
          <ul className="serviceMenu">
            {userMenu.map((item, index) => {
              const {pathname, menuValue} = item;
              return <NavLink to={`/service/${pathname}`} key={index}>
                <li><span><b>{menuValue}</b></span></li>
              </NavLink>
            })}

          </ul>
        </div>
        <div className="logoutSec">
          <button
            className="Btn-sm Btn-transparent"
            onClick={logout}
          >로그아웃
          </button>
        </div>
      </nav>
      <nav className="mobileActionBarContainer">
        <div>모바일헤더</div>
      </nav>
    </>
  )
}

export default ActionBar
