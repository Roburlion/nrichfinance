import React, { useState, useEffect } from 'react';
import style from './Styles.module.css'

function ScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className={style.component}>Scroll Y: {scrollY}</div>;
}

export default ScrollY;