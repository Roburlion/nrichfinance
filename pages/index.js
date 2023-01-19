import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home({ session }) {
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroMask}>
          <div className={styles.heroContent}>
            <div className={styles.heroTitle}>
              <p>Welcome to NRich&nbsp;Finance</p>
            </div>
            <div className={styles.heroSubtitle}>
              <p>Unlock the doors to a world of educational opportunities with an international student loan, sign up today and take the first step towards achieving your dreams</p>
            </div>
            <div className={styles.heroButton}>
              <Link href="/signup">SIGN UP NOW!</Link>
            </div>
          </div>
        </div>
      </div>
    </>    
  );
}
