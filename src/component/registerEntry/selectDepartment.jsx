import React, { useEffect, useState } from 'react';

function DepartmentErrorMessage() {
  return <div className="InputErrorMsg">부서 이름을 입력해 주세요.</div>;
}

function SelectDepartment() {
  const [departmentValue, setDepartmentValue] = useState('');
  const [isDepartmentValid, setIsDepartmentValid] = useState(true);
  const [isDepartmentDisable, setIsDepartmentDisable] = useState(true);
  const [departmentList, setDepartmentList] = useState(['기본 부서명']);
  const [isDepartmentEdit, setIsDepartmentEdit] = useState(false);
  const [editDepartmentValue, setEditDepartmentValue] = useState('');

  useEffect(() => {
    setIsDepartmentDisable(!isDepartmentValid);
  }, [departmentValue]);

  function validDepartment(e) {
    const { value } = e.target;
    setDepartmentValue(value);
    setIsDepartmentValid(value.length > 1);
  }

  function registerDepartment() {}

  function addDepartment() {
    const newDepartmentList = departmentList.slice();
    if (departmentValue.length > 1) {
      newDepartmentList.push(departmentValue);
      setDepartmentList(newDepartmentList);
    }
    setDepartmentValue('');
  }

  function editDepartment(initialEditValue, listIndex) {
    setIsDepartmentEdit(true);
    setEditDepartmentValue(initialEditValue);
    setIsDepartmentEdit(listIndex);
  }

  function validEditDepartment(e) {
    const { value } = e.target;
    setEditDepartmentValue(value);
  }

  function completedEditDepartment(index) {
    const newDepartmentList = departmentList.slice();
    newDepartmentList[index] = editDepartmentValue;
    setDepartmentList(newDepartmentList);
    setIsDepartmentEdit(false);
  }

  function removeDepartment(index) {
    const newDepartmentList = departmentList.slice();
    newDepartmentList.splice(index, 1);
    setDepartmentList(newDepartmentList);
  }

  function selectDepartment(e) {
    const target = e.target.innerText;
    setDepartmentValue(target);
  }

  return (
    <div className="departmentContainer">
      <h6>
        <strong>부서에 필요한 책을 추천드려요!</strong>
      </h6>
      <p>
        어떤 부서에 계신지 <br />
        부서 이름을 선택해 주세요.
      </p>
      <input
        type="text"
        placeholder="부서 이름 (예: 개발 부서, 경영지원 부서 등)"
        maxLength={100}
        onChange={validDepartment}
        value={departmentValue}
        className="InputText Input-md"
      />
      {!isDepartmentValid && <DepartmentErrorMessage />}
      <div className="departmentResultSec">
        <ul>
          {departmentList.map((list, index) => (
            <li key={index}>
              {!(isDepartmentEdit === index) ? (
                <div>
                  <button type="button" onClick={selectDepartment}>
                    <span>{list}</span>
                  </button>
                  <button type="button" onClick={() => editDepartment(list, index)}>
                    수정
                  </button>
                  <button type="button" onClick={() => removeDepartment(index)}>
                    삭제
                  </button>
                </div>
              ) : (
                <div>
                  <input type="text" value={editDepartmentValue} onChange={validEditDepartment} />
                  <button type="button" onClick={() => completedEditDepartment(index)}>
                    완료
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <button type="button" onClick={addDepartment}>
          + {departmentValue} 추가하기
        </button>
      </div>
      <button
        type="button"
        disabled={isDepartmentDisable}
        className="Btn-primary Btn-sm"
        onClick={registerDepartment}
      >
        입력했어요.
      </button>
    </div>
  );
}

export default SelectDepartment;
