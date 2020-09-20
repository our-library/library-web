import * as React from 'react';
import {useState} from "react";
import {getToken, removeToken} from "../../utils/handleToken/handleToken";
import {Route, Switch, useRouteMatch} from "react-router";
import BookList from "../bookList/booList";
import Setting from "../setting/setting";
import MyRent from "../myRent/myRent";
import {Link} from "react-router-dom";

const isGroupMaster = false;
const servicePath = 'service';
const defaultUserMenu = [
  {
    pathname: `service/bookList`,
    menuValue: '전체 책 목록'
  },
  {
    pathname: `service/myRent`,
    menuValue: '나의 대여'
  },
  {
    pathname: `service/setting`,
    menuValue: '설정'
  },
];
const GroupMasterMenu = [
  '전체 책 목록',
  '책 등록',
  '대여중인 책',
  '문의',
  '회원관리',
  '설정'
];

function ServiceRoot() {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/bookList`} component={BookList}/>
      <Route path={`${path}/myRent`} component={MyRent}/>
      <Route path={`${path}/setting`} component={Setting}/>
      <Route exact path={path} component={BookList}/>
    </Switch>
  )
}

function ActionBar() {
  const [userMenu, setUserMenu] = useState(defaultUserMenu);

  function logout() {
    removeToken();
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
            >구성원 초대하기</button>
          </div>
          <ul className="activeMenu">
            {userMenu.map((item, index) => {
              const {pathname, menuValue} = item;
              return <li key={index}><Link to={pathname}><b>{menuValue}</b></Link></li>
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
      <ServiceRoot />
    </>
  )
}

export default ActionBar
