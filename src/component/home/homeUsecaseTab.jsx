import React, {createRef, useEffect, useRef, useState, Children} from 'react';

function HomeUsecaseTab(props) {
  const {children} = props;
  const tabUnderLine = useRef();
  const homeUsecaseTabWrap = useRef();
  const [isTabActiveIndex, setIsTabActiveIndex] = useState(0);
  const usecaseRefs = useRef(Array.from({length: 4}, () => createRef()));
  const [moveToLeftValue, setMoveToLeftValue] = useState(null);
  const [underlineWidth, setUnderlineWidth] = useState(50);

  useEffect(() => {
    const firstTarget = usecaseRefs.current[0].current;
    calculateActiveTabUnderLine(firstTarget);
  }, []);


  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isTabActiveIndex]);

  function handleResize() {
    const currentTarget = usecaseRefs.current[isTabActiveIndex].current;
    calculateActiveTabUnderLine(currentTarget);
  }


  function handleTab(e, index) {
    const {target} = e;
    calculateActiveTabUnderLine(target);
    setIsTabActiveIndex(index);
  }

  function calculateActiveTabUnderLine(target) {
    // const underLine = tabUnderLine.current;
    const distanceTargetToLeft = target.getBoundingClientRect().left;
    const distanceMenuBoxToLeft = homeUsecaseTabWrap.current.getBoundingClientRect().left;
    const startTargetLeft = distanceTargetToLeft - distanceMenuBoxToLeft;

    setUnderlineWidth(target.offsetWidth);
    setMoveToLeftValue(startTargetLeft);
  }

  return (
    <>
      <div className="usecaseTabWrap" ref={homeUsecaseTabWrap}>
        {children && Children.map(children, (child, index) => {
          const {value, component} = child.props;
          return (
            <>
              <div>
                <button
                  type="button"
                  key={child.key}
                  onClick={(e) => handleTab(e, index)}
                  ref={usecaseRefs.current[index]}
                  className={`${isTabActiveIndex === index && 'tabActive'}`}
                >
                  {value}&nbsp;
                </button>
              </div>
            </>
          )
        })}

        <div className="usecaseTabUnderLine" ref={tabUnderLine} style={{width: underlineWidth, left: moveToLeftValue}}/>
      </div>

      {children && Children.map(children, (child, index) => {
        const {component} = child.props;
        if (isTabActiveIndex === index) {
          return (
            <>
              {component}
            </>
          )
        }
      })}
    </>
  );
}

export function HomeUsecaseTabComponent(props) {
  const {component} = props;
  return (
    <>
      {component}
    </>
  )
}

export default HomeUsecaseTab;
