import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { removeToken } from '../../utils/handleToken';
import { GroupMasterMenu } from '../../constants/serviceMenu';
import { fetchGroupMe } from '../../store/api/groupApi';
import { fetchUserName } from '../../store/api/usersApi';
import { jobLists } from '../../constants/jobLists';
import { MODAL_DATA } from '../../constants/modal';
import { removeGroupCount } from '../../utils/handleUser';
import { ROUTE_PATH } from '../../constants/path';
import Button from '../common/button';

function ActionBar() {
  const history = useHistory();
  const location = useLocation();

  const { INVITE_PEOPLE_MODAL } = MODAL_DATA;
  const { SIGN_IN } = ROUTE_PATH;
  const [userMenu] = useState(GroupMasterMenu);
  const [userName, setUserName] = useState('');
  const [userGroupName, setUserGroupName] = useState('');
  const [userDepartment, setUserDepartment] = useState('');
  const [userJobName, setUserJobName] = useState('');
  const [userRentals, setUserRentals] = useState(0);
  const [userOverdueRentals, setUserOverdueRentals] = useState(0);
  const [groupInvitationKey, setGroupInvitationKey] = useState('');

  function logout() {
    removeToken();
    removeGroupCount();
    history.replace(SIGN_IN);
  }

  useEffect(() => {
    getUserInfo();
  }, [userOverdueRentals, userRentals]);

  async function getUserInfo() {
    const name = await fetchUserName();
    setUserName(name);

    const data = await fetchGroupMe();
    const results = data.results[0];
    const { name: groupName, department, jobKey, rentals, overdueRentals, invitationKey } = results;

    setUserGroupName(groupName);
    setUserDepartment(department || '부서명');
    setJobName(jobKey);
    setUserRentals(rentals);
    setUserOverdueRentals(overdueRentals);
    setGroupInvitationKey(invitationKey);
  }

  function setJobName(jobKey) {
    const jobKeyIndex = jobLists.findIndex((list) => list.jobKey === jobKey);
    const { jobName } = jobLists[jobKeyIndex];
    setUserJobName(jobName);
  }

  return (
    <>
      <nav className="actionBarContainer">
        <div className="">
          <div className="mainLogo">
            <img src="" alt="OURBOOKS-logo" />
          </div>
          <div className="mainUserInfo">
            <div className="mainUserProfile">
              <img src="" alt="user-profile" />
            </div>
            <p>
              <strong>{userName}</strong>
            </p>
            <div className="profileDescription">
              <small>{userJobName}</small>
              <small>{userDepartment}</small>
              <small>{userGroupName}</small>
            </div>
          </div>
          <div className="bookStatusByUser">
            <div className="statusBox">
              <small className="tag">대여중</small>
              <h6 className="rent">
                <span>{userRentals}</span>
              </h6>
            </div>
            <div className="statusBox">
              <small className="tag">연체됨</small>
              <h6 className="overdue">{userOverdueRentals}</h6>
            </div>
          </div>
          <div className="invitePeople">
            <Link
              to={{
                pathname: '/service/modal/invitePeople',
                state: {
                  background: location,
                  data: INVITE_PEOPLE_MODAL,
                  groupInvitationKey,
                },
              }}
            >
              <Button classType="transparent" size="sm">
                구성원 초대하기
              </Button>
            </Link>
          </div>
          <ul className="serviceMenu">
            {userMenu.map((item, index) => {
              const { pathname, menuValue } = item;
              return (
                <NavLink to={pathname} key={index}>
                  <li>
                    <span>
                      <b>{menuValue}</b>
                    </span>
                  </li>
                </NavLink>
              );
            })}
          </ul>
        </div>
        <div className="logoutSec">
          <Button classType="transparent" size="sm" handleClick={logout}>
            로그아웃
          </Button>
        </div>
      </nav>
      <nav className="mobileActionBarContainer">
        <div>모바일헤더</div>
      </nav>
    </>
  );
}

export default ActionBar;
