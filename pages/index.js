import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import HeroBanner from '../components/HeroBanner/HeroBanner';
import BrandBanner from '../components/BrandBanner/BrandBanner';
import CardBanner from '../components/CardBanner/CardBanner';
import UniSupport from '../components/UniSupport/App'

export default function Home({ session }) {
  const cards = [
    { 
      url: require('../components/CardBanner/rocket.svg').default.src,
      title: 'Fast. Simple. Easy.',
      text: '',
    },
    {
      url: require('../components/CardBanner/types.svg').default.src,
      title: 'Secured & Unsecured loans',
      text: '',
    },
    {
      url: require('../components/CardBanner/bank.svg').default.src,
      title: 'Rates starting at 7.95%',
      text: '',
    },
  ]
  return (
    <>
      <BrandBanner />
      <HeroBanner
        image={require('../components/HeroBanner/hands_and_laptop_1920.jpg').default.src}
        title='Welcome to NRich&nbsp;Finance'
        text='Unlock the doors to a world of educational opportunities with an international student loan, sign up today and take the first step towards achieving your dreams'
      />
      <CardBanner cards={cards} />
      <UniSupport />
    </>    
  );
}
