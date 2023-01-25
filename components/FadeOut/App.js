/* App.js */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Styles.module.css';
import navLogo from '../../public/apple-touch-icon.png';

import { useRouter } from 'next/router'

export default function App(props) {
  const routes = {
    '/': 'Welcome',
    '/about': 'About',
    '/contact': 'Contact',
    '/profile': 'Profile',
  }

  const pageTitle = routes[useRouter().pathname]

  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrollY < 150) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [scrollY]);

  return (
    <div className={`${styles.hello} ${isVisible ? styles.fadeIn : ''}`}>
      <div className={styles.headingWrapper}>
        <h1>{pageTitle}</h1>
      </div>
    </div>
  );
}