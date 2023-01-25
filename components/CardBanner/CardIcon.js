import React from 'react';
import style from './CardIcon.module.css'

export default function CardIcon(props) {
  return (
    <div className={style.cardIcon} style={{ backgroundImage: `url(${props.url})` }} />
  )
}