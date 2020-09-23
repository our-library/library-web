import React, {useState} from 'react';
import {jobLists} from '../../constants/jobLists';

function JobNameInput({setJobKey}) {
  const [jobName, setJobName] = useState('');
  const [filterJobList, setFilterJobList] = useState([]);
  const [isGroupSearchResult, setIsGroupSearchResult] = useState(false);

  function handleJobKey(e) {
    const target = e.target.value;
    setJobName(target);
    const filterJobList = jobLists.filter((jobList) => {
      if (target && jobList.jobName.includes(target)) {
        setIsGroupSearchResult(false);
        return jobList
      } else {
        setIsGroupSearchResult(true);
      }
    });
    setFilterJobList(filterJobList);
  }

  function handleJobNameList(jobKey, jobName) {
    setJobKey(jobKey);
    setJobName(jobName);
    setIsGroupSearchResult(false);
  }
  console.log(filterJobList);

  return (
    <>
      <input
        type="text"
        className="InputText Input-sm jobNameInput"
        placeholder="직업 이름 (예: CEO, PM, 백엔드 개발자 등)"
        value = {jobName}
        onChange={handleJobKey}
      />
      {isGroupSearchResult &&
      <div className="makeGroupSearchResult">
        <ul>
          {filterJobList.map((jobList, index) => {
            const {jobKey, jobName} = jobList;
            return <li
              onClick={() => handleJobNameList(jobKey, jobName)}
              key={index}
              className="filterJobList"
            > {jobName} </li>
          })}
        </ul>
      </div>
      }
    </>
  )
}

export default JobNameInput
