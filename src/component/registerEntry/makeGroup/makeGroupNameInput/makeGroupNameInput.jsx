import * as React from 'react';
import {useState} from "react";

function MakeGroupNameErrorMessage() {
  return (
    <div className="InputErrorMsg">
      그룹 이름을 입력해 주세요.
    </div>
  )
}

function MakeGroupNameInput({valueBySelect, setGroupNameValue}) {
  const [isMakeGroupNameValid, setIsMakeGroupNameValid] = useState(true);

  function handleMakeGroupName(e) {
    const groupName = e.target.value;
    setGroupNameValue(groupName);
    (groupName.length > 1) ? setIsMakeGroupNameValid(true) : setIsMakeGroupNameValid(false);
  }

  return (
    <>
      <input
        type="text"
        className="InputText Input-sm"
        placeholder={valueBySelect}
        onChange={handleMakeGroupName}
        onFocus={() => setIsMakeGroupNameValid(false)}
      />
      {!isMakeGroupNameValid && <MakeGroupNameErrorMessage/>}
    </>
  )
}

export default MakeGroupNameInput
