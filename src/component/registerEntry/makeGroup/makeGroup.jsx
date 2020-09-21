import * as React from 'react';
import {useState} from "react";
import {Api} from "../../../store/api";
import {useEffect} from "react";
import {useHistory} from "react-router";
import MakeGroupNameInput from "./makeGroupNameInput/makeGroupNameInput";
import JobNameInput from "../jobNameInput/jobNameInput";
import {csvHandler} from "../../../utils/csvHandler";

function MakeGroup() {
  const history = useHistory();
  const [categoryValue, setCategoryValue] = useState('');
  const [groupNameValue, setGroupNameValue] = useState('');
  const [jobKey, setJobKey] = useState('');
  const [valueBySelect, setValueBySelect] = useState('회사 또는 단체 이름');

  const [userName, setUserName] = useState('');
  useEffect(() => {
    getUserName();
  }, []);

  function getUserName() {
    Api.fetch({
      url: '/users/me/profile',
      method: 'get',
    }).then(data => setUserName(data.name))
  }

  function handleMakeGroup() {
    const data = {
      "category": categoryValue,
      "groupName": groupNameValue,
      "jobKey": jobKey
    };
    Api.fetch({
      url: '/groups',
      method: 'post',
      data: data
    }).then(result => {
      const {groupId, memberId} = result;
      console.log('create Library!');
      history.replace('/service')
    });
  }

  function handleSelectCategory(e) {
    const target = e.target.value;
    setGroupNameValue(target);
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
          <MakeGroupNameInput valueBySelect={valueBySelect} setGroupNameValue={setGroupNameValue}/>
          <JobNameInput setJobKey={setJobKey}/>
        </div>
        <button
          onClick={handleMakeGroup}
          className="Btn-md Btn-primary">
          관리자로 도서관 만들기
        </button>
      </div>
    </div>
  )
}

export default MakeGroup
