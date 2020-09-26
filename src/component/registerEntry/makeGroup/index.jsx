import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router';

import MakeGroupNameInput from './makeGroupNameInput';
import JobNameInput from '../jobNameInput';
import { makeGroupRequest } from '../../../store/api/groupApi';
import { fetchUserProfile } from '../../../store/api/usersApi';
import { removeToken } from '../../../utils/handleToken';
import { removeGroupCount } from '../../../utils/handleUser';

function MakeGroup() {
  const history = useHistory();
  const [categoryValue, setCategoryValue] = useState('');
  const [groupNameValue, setGroupNameValue] = useState('');
  const [jobKey, setJobKey] = useState('');
  const [valueBySelect, setValueBySelect] = useState('회사 또는 단체 이름');
  const [isValidJopNameValue, setIsValidJopNameValue] = useState(false);
  const [isMakeBtnDisable, setIsMakeBtnDisable] = useState(true);

  const [userName, setUserName] = useState('');
  useEffect(() => {
    getUserName().then();
  }, []);

  async function getUserName() {
    const data = await fetchUserProfile();
    setUserName(data.name);
  }

  useEffect(() => {
    setIsMakeBtnDisable(!(categoryValue && groupNameValue && isValidJopNameValue));
  }, [categoryValue, groupNameValue, isValidJopNameValue]);

  async function handleMakeGroup() {
    const data = {
      category: categoryValue,
      groupName: groupNameValue,
      jobKey,
    };
    await makeGroupRequest(data).then(() => {
      history.replace('/service');
    });
  }

  function handleSelectCategory(e) {
    const target = e.target.value;
    setCategoryValue(target);
    if (target === 'company') {
      setValueBySelect('회사 이름');
    } else if (target === 'group') {
      setValueBySelect('단체 이름');
    } else if (target === 'personal') {
      setValueBySelect(`${userName} 님의 도서관`);
    }
  }

  function entryLogout() {
    removeToken();
    removeGroupCount();
    history.replace('/register/signIn');
  }

  return (
    <>
      <div className="makeGroupContainer">
        <div className="makeGroupSec">
          <h4>도서관 만들기</h4>
          <div className="makeGroupInputSec">
            <select
              className="InputText Input-sm"
              placeholder="어디에 사용할 예정인가요?"
              onChange={handleSelectCategory}
              defaultValue="default"
            >
              <option value="default" disabled hidden>
                어디에 사용할 예정인가요?
              </option>
              <option value="company">회사</option>
              <option value="group">단체</option>
              <option value="personal">개인(혼자이용)</option>
            </select>
            <MakeGroupNameInput
              valueBySelect={valueBySelect}
              setGroupNameValue={setGroupNameValue}
            />
            <JobNameInput setIsValidJopNameValue={setIsValidJopNameValue} setJobKey={setJobKey} />
          </div>
          <button
            type="button"
            onClick={handleMakeGroup}
            className="Btn-md Btn-primary"
            disabled={isMakeBtnDisable}
          >
            관리자로 도서관 만들기
          </button>
        </div>
      </div>
      <div className="entryLogoutSec">
        <button type="button" onClick={entryLogout} className="Btn-transparent Btn-md">
          로그아웃
        </button>
      </div>
    </>
  );
}

export default MakeGroup;
