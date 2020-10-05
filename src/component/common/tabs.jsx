import React, { createRef, useEffect, useRef, useState } from 'react';

function Tabs({ menuObj, handleMenu }) {
  const tabUnderLine = useRef();
  const tabWrap = useRef();
  const [isTabActive, setIsTabActive] = useState(0);
  const refs = useRef([createRef()]);

  function handleTab(e) {
    const { target } = e;
    calculateActiveTabUnderLine(target);
    const clickElIndex = findMenuIndex(target);
    setIsTabActive(clickElIndex);
    handleMenu();
  }

  function findMenuIndex(target) {
    const targetValue = target.innerText;
    const result = menuObj.filter((menu) => menu.value.includes(targetValue))[0];
    return menuObj.indexOf(result);
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
    const moveToLeftValue = startTargetLeft + (targetWidth - underLineWidth);

    underLine.style.left = `${moveToLeftValue}px`;
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
      <div className="tabUnderLine" ref={tabUnderLine} />
    </div>
  );
}

export default Tabs;
