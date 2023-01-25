import React from "react";
import styles from './CardText.module.css'

export default function CardText(props) {
    return (
        <div className={styles.cardText}>{props.text}</div>
    )
}