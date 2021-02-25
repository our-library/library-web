import React, {createRef, useState, useRef, useEffect, forwardRef} from 'react';

export function Select(props) {
  const {size, children, defaultValue, selectList, setSelectValue, type = 'default'} = props;
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isOptionActiveIndex, setIsOptionActiveIndex] = useState(0);
  const [selectKeyValue, setSelectKeyValue] = useState(0);
  const refs = useRef(Array.from({length: selectList.length}, () => createRef()));

  useEffect(() => {
    setSelectKeyValue(defaultValue);
  },[]);

  function handleSelect(e, index) {
    setIsOptionActiveIndex(index);
    setSelectValue(selectList[index].value);
    setSelectKeyValue(selectList[index].keyValue);
    setIsSelectOpen(false);
  }

  return (
    <div className={`customSelectWrap-${type} ${size}`}>
      <div className="customSelect">
        <div
          onClick={() => {
            setIsSelectOpen(!isSelectOpen)
          }}
          className={`select-trigger-${type} ${isSelectOpen && 'open'}`}
        >
          <span>{selectKeyValue}</span>
          <div className="selectArrow"/>
        </div>

        {isSelectOpen && (
          <div className={`customOptionWrap-${type} ${isSelectOpen && 'selectOpenActive'}`}>
            {selectList.map((list, index) => {
              const {value, keyValue} = list;
              return (
                <Option
                  key={value}
                  value={value}
                  keyvalue={keyValue}
                  ref={refs.current[index]}
                  onClick={(e) => handleSelect(e, index)}
                  className={`customOption-${type} ${isOptionActiveIndex === index && 'selected'}`}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export const Option = forwardRef((props, ref) => {
  const {value, keyvalue} = props;

  return (
    <span
      ref={ref}
      data-value={value}
      {...props}
    >
      {keyvalue}
    </span>
  )
});


