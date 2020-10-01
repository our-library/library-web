import React, { useState } from 'react';

function MakeGroupNameErrorMessage() {
  return <div className="InputErrorMsg">그룹 이름을 입력해 주세요.</div>;
}

function MakeGroupNameInput({ valueBySelect, setGroupNameValue }) {
  const [isMakeGroupNameValid, setIsMakeGroupNameValid] = useState(true);

  function handleMakeGroupName(e) {
    const { value: groupNameValue } = e.target;
    setGroupNameValue(groupNameValue);
    setIsMakeGroupNameValid(groupNameValue.length > 1);
  }

  return (
    <>
      <input
        type="text"
        className="InputText Input-sm"
        maxLength={100}
        placeholder={valueBySelect}
        onChange={handleMakeGroupName}
        onFocus={() => setIsMakeGroupNameValid(false)}
      />
      {!isMakeGroupNameValid && <MakeGroupNameErrorMessage />}
    </>
  );
}

export default MakeGroupNameInput;
