import React, {useEffect, useState} from 'react';
import {CSSTransition} from "react-transition-group";

function SnackBar(props) {
  const {children, showSnackBar, setShowSnackBar} = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSnackBar(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showSnackBar]);


  return (
    <>
      <CSSTransition
        in={showSnackBar}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <div className="snackBarSec">
          <div className="snackBar">
            {children}
            <button onClick={() => {
              setShowSnackBar(false)
            }}>
              닫기
            </button>
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

export default SnackBar
