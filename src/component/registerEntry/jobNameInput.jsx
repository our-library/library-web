import React, { useState } from 'react';
import { jobLists } from '../../constants/jobLists';

function JobNameNoKeyErrorMessage() {
  return <div className="InputErrorMsg">직업 이름을 선택해 주세요.</div>;
}

function JobNameInput({ setJobKey, setIsJobNameKeyValid, isJobNameKeyValid }) {
  const [jobName, setJobName] = useState('');
  const [filterJobList, setFilterJobList] = useState([]);
  const [isGroupSearchResult, setIsGroupSearchResult] = useState(false);

  function handleJobKey(e) {
    const target = e.target.value;

    const nextFilterJobList = jobLists.filter((jobList) => {
      const isIncludeTarget = jobList.jobName.includes(target) || jobList.jobName.toLowerCase().includes(target);

      if (target && isIncludeTarget) {
        return jobList;
      }
      return false;
    });
    setIsGroupSearchResult(nextFilterJobList.length > 1);
    setIsJobNameKeyValid(target);
    setJobName(target);
    setFilterJobList(nextFilterJobList);
  }

  function handleJobNameList(jobKey, nextJobName) {
    setJobKey(jobKey);
    setJobName(nextJobName);
    setIsGroupSearchResult(false);
  }

  return (
    <>
      <input
        type="text"
        className="InputText Input-sm jobNameInput"
        placeholder="직업 이름 (예: CEO, PM, 백엔드 개발자 등)"
        value={jobName}
        onChange={handleJobKey}
      />
      {isGroupSearchResult && (
        <div className="makeGroupSearchResult">
          <ul>
            {filterJobList.map((jobList, index) => {
              const { jobKey, jobName: name } = jobList;
              return (
                <li
                  onClick={() => handleJobNameList(jobKey, name)}
                  key={index}
                  className="filterJobList"
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {!isJobNameKeyValid && <JobNameNoKeyErrorMessage />}
    </>
  );
}

export default JobNameInput;
