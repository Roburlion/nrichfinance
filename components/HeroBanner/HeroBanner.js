/*
  Import:
    import HeroBanner from './HeroBanner/HeroBanner'

  Call:
    <HeroBanner
      image={require('./HeroBanner/hands_and_laptop_1920.jpg')}
      title='Welcome to NRich&nbsp;Finance'
      text='Unlock the doors to a world of educational opportunities with an international student loan, sign up today and take the first step towards achieving your dreams'
    />

  Dependencies:
    import Link from 'next/link';
  
  Notes:
    Change the Hero button line from:
      {/ *<Link href="/signup">SIGN UP NOW!</Link>* /}
    to:
      <Link href="/signup">SIGN UP NOW!</Link>
*/

import Link from "next/link";

import styles from "./HeroBanner.module.css";

export default function App(props) {
  console.log('props check\n', props.image);
  return (
    <div className={styles.heroImage} style={{ backgroundImage: `url(${props.image})` }} >
      <div className={styles.heroMask}>
        <div className={styles.heroContent}>
          <div className={styles.heroTitle}>
            {props.title}
          </div>
          <div className={styles.heroSubtitle}>
            {props.text}
          </div>
          <div className={styles.heroButton}>
            <Link href="/signup">SIGN UP NOW!</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
