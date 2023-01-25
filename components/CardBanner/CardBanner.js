/*
  Import with
  import CardBanner from './CardBanner/CardBanner';
  
  Props take the form of an array of object:
  const cards = [
    { 
      url: require('./CardBanner/accessibility.png'),
      title: 'Accessibility',
      text: 'Committed to making education accessible to all students, regardless of their background or location.',
    },
    {
      url: require('./CardBanner/empowerment.png'),
      title: 'Empowerment',
      text: 'Dedicated to empowering students to reach their full potential through education.',
    },
  ]

  Call the component as follows:
  return <CardBanner cards={cards} />
*/

import React from 'react';
import styles from './CardBanner.module.css'
import Card from './Card';

export default function CardBanner(props) {
  const cards = props.cards

  return (
    <div className={styles.cardBanner}>
      {cards.map((card, index) => (        
        <Card key={index}
          url={card.url} 
          title={card.title} 
          text={card.text} 
        />
      ))}
    </div>
  )
}