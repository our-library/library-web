import React from 'react';
import {useState} from "react";
import {Api} from "../../../store/api";
import {useEffect} from "react";
import {useHistory} from "react-router";
import MakeGroupNameInput from "./makeGroupNameInput";
import JobNameInput from "../jobNameInput";
import {makeGroupRequest} from "../../../store/api/groupApi";
import {fetchUserProfile} from "../../../store/api/usersApi";

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

  useEffect(() => {
    setIsMakeBtnDisable(!(categoryValue && groupNameValue && isValidJopNameValue));
  },[categoryValue, groupNameValue, isValidJopNameValue]);

  async function getUserName() {
   await fetchUserProfile().then(data => setUserName(data.name))
  }

  async function handleMakeGroup() {
    const data = {
      category: categoryValue,
      groupName: groupNameValue,
      jobKey: jobKey
    };
    await makeGroupRequest(data)
      .then(() => {
        history.replace('/service')
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

  return (
    <div className="makeGroupContainer">
      <div className="makeGroupSec">
        <h4>도서관 만들기</h4>
        <div className="makeGroupInputSec">
          <select
            className="InputText Input-sm"
            placeholder="어디에 사용할 예정인가요?"
            onChange={handleSelectCategory}
            defaultValue='default'
          >
            <option value="default" disabled hidden>어디에 사용할 예정인가요?</option>
            <option value="company">회사</option>
            <option value="group">단체</option>
            <option value="personal">개인(혼자이용)</option>
          </select>
          <MakeGroupNameInput
            valueBySelect={valueBySelect}
            setGroupNameValue={setGroupNameValue}
          />
          <JobNameInput
            setIsValidJopNameValue={setIsValidJopNameValue}
            setJobKey={setJobKey}
          />
        </div>
        <button
          onClick={handleMakeGroup}
          className="Btn-md Btn-primary"
          disabled={isMakeBtnDisable}
        >
          관리자로 도서관 만들기
        </button>
      </div>
    </div>
  )
}

export default MakeGroup