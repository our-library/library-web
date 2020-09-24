import React, {useEffect, useState} from 'react';
import {removeToken} from "../../utils/handleToken";
import {useHistory, useLocation} from "react-router";
import {Link, NavLink} from "react-router-dom";
import {defaultUserMenu, GroupMasterMenu} from "./serviceMenu";
import {fetchGroupMe} from "../../store/api/groupApi";
import {fetchUserProfile} from "../../store/api/usersApi";
import {jobLists} from "../../constants/jobLists";
import CreateConfirmModal from "../modal/CreateConfirmModal";
import {MODAL_DATA} from "../../constants/modalData";
import {removeGroupCount} from "../../utils/handleUser";

function ActionBar() {
  const history = useHistory();
  const location = useLocation();

  const {INVITE_PEOPLE_MODAL} = MODAL_DATA;
  const [userMenu, setUserMenu] = useState(GroupMasterMenu);
  const [userName, setUserName] = useState('');
  const [userGroupName, setUserGroupName] = useState('');
  const [userDepartment, setUserDepartment] = useState('');
  const [userJobName, setUserJobName] = useState('');
  const [userRentals, setUserRentals] = useState(0);
  const [userOverdueRentals, setUserOverdueRentals] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [groupInvitationKey, setGroupInvitationKey] = useState('');

  function logout() {
    removeToken();
    removeGroupCount();
    history.replace('/register/signIn');
  }

  useEffect(() => {
    fetchUserProfile().then(data => {
      const {name} = data;
      setUserName(name);
    });
    fetchGroupMe().then(data => {
      const {name: groupName, department, jobKey, rentals, overdueRentals, invitationKey} = data.results[0];
      setUserGroupName(groupName);
      setUserDepartment(department || '부서명');
      setJobName(jobKey);
      setUserRentals(rentals);
      setUserOverdueRentals(overdueRentals);
      setGroupInvitationKey(invitationKey);
    })
  }, []);

  function setJobName(jobKey) {
    const jobKeyIndex = jobLists.findIndex((list) => {
      return list.jobKey === jobKey
    });
    const userJobName = jobLists[jobKeyIndex].jobName;
    setUserJobName(userJobName);
  }

  function handleInvitationCodeModal() {
    setIsOpenModal(true)
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
            <Link to={{
              pathname: '/service/modal/invitePeople',
              state: {
                background: location,
                data: INVITE_PEOPLE_MODAL,
                groupInvitationKey: groupInvitationKey
              }
            }}>
              <button
                type="button"
                className="Btn-sm Btn-transparent"
              >
                구성원 초대하기
              </button>
            </Link>
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
