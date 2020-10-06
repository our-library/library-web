import React, {createRef, useEffect, useRef, useState} from 'react';

function Tabs({ menuArr, handleMenu }) {
  const tabUnderLine = useRef();
  const tabWrap = useRef();
  const [isTabActiveIndex, setIsTabActiveIndex] = useState(0);
  const refs = useRef(Array.from({ length: menuArr.length }, () => createRef()));
  const [moveToLeftValue, setMoveToLeftValue] = useState(null);

  useEffect(() => {
    const firstTarget = refs.current[0].current;
    calculateActiveTabUnderLine(firstTarget);

    function handleResize() {
      const targetMenuList = refs.current;
      const currentTarget = targetMenuList.filter(ref => ref.current.className.includes('tabActive'))[0].current;
      calculateActiveTabUnderLine(currentTarget)
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  },[]);

  function handleTab(e, index) {
    const { target } = e;
    calculateActiveTabUnderLine(target);
    setIsTabActiveIndex(index);
    handleMenu();
  }

  function findMenuIndex(target) {
    const targetValue = target.innerText;
    const result = menuArr.findIndex((menu) => menu.value.includes(targetValue))[0];
    return menuArr.indexOf(result);
  }

  function calculateActiveTabUnderLine(target) {
    const underLine = tabUnderLine.current;
    const distanceTargetToLeft = target.getBoundingClientRect().left;
    const distanceMenuBoxToLeft = tabWrap.current.getBoundingClientRect().left;
    const startTargetLeft = distanceTargetToLeft - distanceMenuBoxToLeft;
    const targetWidth = target.offsetWidth / 2;
    const underLineWidth = underLine.offsetWidth / 2;
    const moveToLeftValue = startTargetLeft + (targetWidth - underLineWidth);

    setMoveToLeftValue(moveToLeftValue);
  }

  return (
    <div className="tabWrap" ref={tabWrap}>
      {menuArr.map((menu, index) => {
        const { value, key } = menu;
        return (
          <button
            type="button"
            key={key}
            onClick={(e) => handleTab(e,index)}
            ref={refs.current[index]}
            className={`${isTabActiveIndex === index && 'tabActive'}`}
          >
            {value}
          </button>
        );
      })}
      <div className="tabUnderLine" ref={tabUnderLine} style={{ left: moveToLeftValue }}/>
    </div>
  );
}

export default Tabs
