import styles from "../styles/About.module.css";
import HeroBanner from '../components/HeroBanner/HeroBanner'
import CardBanner from '../components/CardBanner/CardBanner';

export default function About({ session }) {
  const cards = [
    { 
      url: require('../components/CardBanner/accessibility.png').default.src,
      title: 'Accessibility',
      text: 'Committed to making education accessible to all students, regardless of their background or location.',
    },
    {
      url: require('../components/CardBanner/empowerment.png').default.src,
      title: 'Empowerment',
      text: 'Dedicated to empowering students to reach their full potential through education.',
    },
    {
      url: require('../components/CardBanner/integrity.png').default.src,
      title: 'Integrity',
      text: 'Committed to maintaining the highest levels of integrity and transparency in all our business practices.',
    },
    {
      url: require('../components/CardBanner/innovation.png').default.src,
      title: 'Innovation',
      text: 'Constantly seeking new and better ways to provide financial support to international students.',
    },
    {
      url: require('../components/CardBanner/respect.png').default.src,
      title: 'Respect',
      text: 'Treating all clients with respect and understanding, regardless of their individual circumstances',
    },
  ]
  
  return (
    <>
      <HeroBanner
        image={require('../components/HeroBanner/dallas_sunset_1920.jpg').default.src}
        title='NRich&nbsp;Finance'
        text='Enriching Indian students to reach their full potential through education in the USA'
      />
      <div className={styles.textBox}>
        <p>NRich Finance is an education loan business that specializes in providing student loans to aspiring candidates from India looking to pursue higher education in the United States. We understand that the cost of higher education in the USA can be overwhelming, especially for Indian students, and we believe that every student should have the opportunity to reach their full potential.</p>
        <br/>
        <p>We offer a wide range of loan products specifically tailored to the needs of Indian students studying in the US. This includes loans for tuition, room and board, books, and other expenses related to attending college or graduate school in the USA.</p>
        <br/>
        <p>Our team of loan counselors is well-versed in the nuances of the US education system and are available to assist students and families with the loan application process, and to provide guidance on how to manage their student loan debt.</p>
        <br/>
        <p>With NRich Finance, Indian students can feel confident that they are getting the financial support they need to achieve their educational dreams in the USA. We are committed to making higher education more affordable and accessible for Indian students, and we are dedicated to helping students find the best loan solution to fit their individual needs.</p>
      </div>
      <CardBanner cards={cards} />
    </>
  )
}
