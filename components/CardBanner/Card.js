import React from "react";
import styles from "./Card.module.css"

import CardIcon from './CardIcon';
import CardTitle from './CardTitle';
import CardText from './CardText';

export default function Card(props) {
  return (
    <div className={styles.card}>
      <CardIcon url={props.url} />
      <CardTitle title={props.title} />
      <CardText text={props.text} />
    </div>
  )
}