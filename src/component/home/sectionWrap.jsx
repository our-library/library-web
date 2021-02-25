import React, {useEffect, useState, useRef, forwardRef} from 'react';

function AnimationWrap(props) {
  const {children, delay} = props;
  const sectionRef = useRef('id');
  const [onViewClass, setOnViewClass] = useState('');

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // 최초 뷰 랜딩시 강제 scroll 발생시키기
    handleScroll();
    return () => handleScroll();
  },[]);

  function handleScroll() {
    const windowHeight = window.innerHeight;
    const window_bottom_position = document.documentElement.scrollTop + windowHeight;
    const offsetTop = sectionRef.current.offsetTop;
    const element_bottom_position = offsetTop + 200;

    if (element_bottom_position < window_bottom_position) {
      sectionRef.current.classList.add('onview')
    }
  }
  return (
    <div
      ref={sectionRef}
      style={{opacity: 0, animationDelay: delay && `${delay}s`}}
      {...props}
    >
      {children}
    </div>
  )
}

export default AnimationWrap
