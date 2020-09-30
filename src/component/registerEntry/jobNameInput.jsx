import React, {useCallback, useEffect, useState} from 'react';
import {jobLists} from '../../constants/jobLists';
import {KEY_CODE} from "../../constants/keyCode";
import { useKeyPress } from "../../utils/useKeyPress";

function JobNameNoKeyErrorMessage() {
  return <div className="InputErrorMsg">직업 이름을 선택해 주세요.</div>;
}

function JobNameInput({setJobKey, setIsJobNameKeyValid, isJobNameKeyValid}) {
  const {ARROW_DOWN, ARROW_UP, ENTER} = KEY_CODE;
  const [jobName, setJobName] = useState('');
  const [filterJobList, setFilterJobList] = useState([]);
  const [isGroupSearchResult, setIsGroupSearchResult] = useState(false);
  const [jobListCursor, setJobListCursor] = useState(0);
  const downPress = useKeyPress(ARROW_DOWN);
  const upPress = useKeyPress(ARROW_UP);
  const enterPress = useKeyPress(ENTER);

  useEffect(() => {
    if (filterJobList.length && downPress) {
      setJobListCursor(prevState =>
        prevState < filterJobList.length - 1 ? prevState + 1 : 0
      );
    }
  }, [downPress]);
  useEffect(() => {
    if (filterJobList.length && upPress) {
      setJobListCursor(prevState =>
        (prevState > 0 ? prevState - 1 : filterJobList.length - 1)
      );
    }
  }, [upPress]);
  useEffect(() => {
    if (filterJobList.length && enterPress) {
      const cursorJobName = filterJobList[jobListCursor].jobName;
      setJobName(cursorJobName);
      setIsGroupSearchResult(false);
      setJobListCursor(0);
    }
  }, [enterPress]);

  function handleJobKey(e) {
    const {value: target} = e.target;
    const newFilterJobList = handleFilterJobLists(target);

    setIsGroupSearchResult(newFilterJobList && target);
    setIsJobNameKeyValid(target);
    setJobName(target);
    setFilterJobList(newFilterJobList);
  }

  function handleFilterJobLists(target) {
    const filterResultList = jobLists.filter((compareList) => {
      const { jobName } = compareList;
      const compareTarget = target.toLowerCase().replace(/\s+/g, '');
      const compareName = jobName.toLowerCase().replace(/\s+/g, '');
      return compareName.includes(compareTarget)
    });
    return filterResultList
  }

  function handleJobNameList(jobKey, targetJobName) {
    setJobKey(jobKey);
    setJobName(targetJobName);
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
              const {jobKey, jobName: name} = jobList;
              return (
                <li
                  onClick={() => handleJobNameList(jobKey, name)}
                  key={index}
                  className={`filterJobList ${index === jobListCursor && 'jobListActive'}`}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {!isJobNameKeyValid && <JobNameNoKeyErrorMessage/>}
    </>
  );
}

export default JobNameInput;
