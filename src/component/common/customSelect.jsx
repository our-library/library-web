import React, {useState, useEffect, useRef, createRef, Children, forwardRef} from 'react';


function CustomSelect(props) {
  const {setSelectValue, children, defaultValue, onChange, placeholder, classType = "default", size} = props;
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isOptionActiveIndex, setIsOptionActiveIndex] = useState(0);
  const [selectKeyValue, setSelectKeyValue] = useState('');
  const refs = useRef(Array.from({length: children.length}, () => createRef()));

  useEffect(() => {
    setSelectKeyValue(defaultValue);
  }, []);

  function handleSelect(e, index, value, keyValue) {
    setIsOptionActiveIndex(index);
    setSelectKeyValue(keyValue); // select 뷰에 명시되는 값
    setSelectValue(value); //부모에게 올려주는 key 값
    setIsSelectOpen(false);

    if (onChange) {
      onChange(e, value);
    }
  }

  return (
    <div className={`customSelectWrap-${classType} ${size}`}>
      <div
        onClick={() => {
          setIsSelectOpen(!isSelectOpen)
        }}
        className={`select-trigger-${classType} ${isSelectOpen && 'open'}`}
      >
        <span>{selectKeyValue ? selectKeyValue : placeholder}</span>
        <div className="selectArrow"/>
      </div>

      {isSelectOpen && (
        <div className={`customOptionWrap-${classType} ${isSelectOpen && 'selectOpenActive'}`}>
          {children && Children.map(children, (child, index) => {
            const {value, keyValue} = child.props;
            return (
              <CustomOption
                key={value}
                value={value}
                keyvalue={keyValue}
                ref={refs.current[index]}
                onClick={(e) => handleSelect(e, index, value, keyValue)}
                className={`customOption-${classType} ${isOptionActiveIndex === index && 'selected'}`}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CustomSelect


export const CustomOption = forwardRef((props, ref) => {
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

