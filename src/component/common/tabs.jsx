import React, { createRef, useEffect, useRef, useState } from 'react';

function Tabs({ menuObj, handleMenu }) {
  const tabUnderLine = useRef();
  const tabWrap = useRef();
  const [isTabActive, setIsTabActive] = useState(0);
  const refs = useRef([createRef()]);
  const [moveToLeftValue, setMoveToLeftValue] = useState(null);

  function handleTab(e) {
    const { target } = e;
    calculateActiveTabUnderLine(target);
    const clickElIndex = findMenuIndex(target);
    setIsTabActive(clickElIndex);
    handleMenu();
  }

  function findMenuIndex(target) {
    const targetValue = target.innerText;
    const findIndex = menuObj.findIndex((menu) => menu.value.includes(targetValue));
    return findIndex;
  }

  useEffect(() => {
    const firstTab = refs.current[0].current;
    calculateActiveTabUnderLine(firstTab);
  }, []);

  function calculateActiveTabUnderLine(target) {
    const underLine = tabUnderLine.current;
    const distanceTargetToLeft = target.getBoundingClientRect().left;
    const distanceMenuBoxToLeft = tabWrap.current.getBoundingClientRect().left;
    const startTargetLeft = distanceTargetToLeft - distanceMenuBoxToLeft;
    const targetWidth = target.offsetWidth / 2;
    const underLineWidth = underLine.offsetWidth / 2;
    const moveValue = startTargetLeft + (targetWidth - underLineWidth);

    setMoveToLeftValue(moveValue);
  }

  return (
    <div className="tabWrap" ref={tabWrap}>
      {menuObj.map((menu, index) => {
        const { value } = menu;
        return (
          <button
            type="button"
            key={menu.key}
            onClick={handleTab}
            ref={refs.current[index]}
            className={`${isTabActive === index && 'tabActive'}`}
          >
            {value}
          </button>
        );
      })}
      <div className="tabUnderLine" ref={tabUnderLine} style={{ left: moveToLeftValue }} />
    </div>
  );
}

export default Tabs;
