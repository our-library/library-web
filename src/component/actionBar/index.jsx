import React, {useEffect, useState} from 'react';
import {removeToken} from "../../utils/handleToken";
import {useHistory} from "react-router";
import {NavLink} from "react-router-dom";
import {defaultUserMenu, GroupMasterMenu} from "./serviceMenu";
import {fetchGroupMe} from "../../store/api/groupApi";
import {fetchUserProfile} from "../../store/api/usersApi";
import {jobLists} from "../../constants/jobLists";

function ActionBar() {
  const history = useHistory();
  const [userMenu, setUserMenu] = useState(GroupMasterMenu);
  const [userName, setUserName] = useState('');
  const [userGroupName, setUserGroupName] = useState('');
  const [userDepartment, setUserDepartment] = useState('');
  const [userJobName, setUserJobName] = useState('');
  const [userRentals, setUserRentals] = useState(0);
  const [userOverdueRentals, setUserOverdueRentals] = useState(0);

  function logout() {
    removeToken();
    history.replace('/register/signIn');
  }

  useEffect(() => {
    fetchUserProfile().then(data => {
      const {name} = data;
      setUserName(name);
    });
    fetchGroupMe().then(data => {
      const {name: groupName, department, jobKey, rentals, overdueRentals} = data.results[0];
      setUserGroupName(groupName);
      setUserDepartment(department || '부서명');
      setJobName(jobKey);
      setUserRentals(rentals);
      setUserOverdueRentals(overdueRentals);
    })
  },[userName, userGroupName, userDepartment, userJobName, userRentals, userOverdueRentals]);

  function setJobName(jobKey) {
    const jobKeyIndex = jobLists.findIndex((list) => {
      return list.jobKey === jobKey
    });
    const userJobName = jobLists[jobKeyIndex].jobName;
    setUserJobName(userJobName);
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
            <p><strong>{userName}</strong></p>
            <div className="profileDescription">
              <small>{userJobName} / {userDepartment}</small>
              <small>{userGroupName}</small>
            </div>
          </div>
          <div className="bookStatusByUser">
            <div className="statusBox">
              <small className="tag">대여중</small>
              <h6 className="rent"><span>{userRentals}</span></h6>
            </div>
            <div className="statusBox">
              <small className="tag">연체됨</small>
              <h6 className="overdue">{userOverdueRentals}</h6>
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
