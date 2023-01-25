import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import HeroBanner from '../components/HeroBanner/HeroBanner';

export default function Home({ session }) {
  return (
    <>
      <HeroBanner
        image={require('../components/HeroBanner/hands_and_laptop_1920.jpg').default.src}
        title='Welcome to NRich&nbsp;Finance'
        text='Unlock the doors to a world of educational opportunities with an international student loan, sign up today and take the first step towards achieving your dreams'
      />
    </>    
  );
}
