import React from "react";
import styles from './CardTitle.module.css'

export default function CardTitle(props) {
    return (
        <div className={styles.cardTitle}>{props.title}</div>
    )
}