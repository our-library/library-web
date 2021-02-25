import React, {
  useState,
  useEffect,
  useRef,
} from "react";

const AutoTextArea = (props) => {
  const {isfocus, onChange} = props;
  const textAreaRef = useRef(null);
  const [text, setText] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const [parentHeight, setParentHeight] = useState("auto");

  useEffect(() => {
    if(isfocus === 'true') {
      textAreaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setParentHeight(`${textAreaRef.current.scrollHeight}px`);
    setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`);
  }, [text]);

  function onChangeHandler(e) {
    setTextAreaHeight("auto");
    setParentHeight(`${textAreaRef.current.scrollHeight}px`);
    setText(e.target.value);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <>
      <textarea
        {...props}
        ref={textAreaRef}
        rows={2}
        style={{height: textAreaHeight, fontSize: '15px'}}
        onChange={onChangeHandler}
      />
    </>
  );
};

export default AutoTextArea;
