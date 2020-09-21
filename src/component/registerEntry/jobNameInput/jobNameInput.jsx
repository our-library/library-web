import React, {useState} from 'react';
import {jobLists} from '../makeGroup/jobLists';

function InviteCodeErrorMessage() {
  return (
    <div className="InputErrorMsg">
      초대코드를 입력하세요.
    </div>
  )
}

function JobNameInput({setJobKey}) {
  const [jobName, setJobName] = useState('');
  const [filterJobList, setFilterJobList] = useState([]);

  const [isGroupSearchResult, setIsGroupSearchResult] = useState(false);

  function handleJobKey(e) {
    const target = e.target.value;
    setJobName(target);
    const filterJobList = jobLists.filter((jobList) => {
      if (target && jobList.jobName.includes(target)) {
        setIsGroupSearchResult(true);
        return jobList
      } else {
        setIsGroupSearchResult(false);
      }
    });
    setFilterJobList(filterJobList);
  }

  function handleJobNameList(jobKey, jobName) {
    setJobKey(jobKey);
    setJobName(jobName);
  }


  return (
    <>
      <input
        type="text"
        className="InputText Input-sm"
        placeholder="직업 이름 (예: CEO, PM, 백엔드 개발자 등)"
        value = {jobName}
        onChange={handleJobKey}
      />
      {isGroupSearchResult &&
      <ul className="makeGroupSearchResult">
        {filterJobList.map((jobList, index) => {
          const {jobKey, jobName} = jobList;
          return <li
            onClick={() => handleJobNameList(jobKey, jobName)}
            key={index}
            className="filterJobList"
          > {jobName} </li>
        })}
      </ul>
      }
    </>
  )
}

export default JobNameInput
