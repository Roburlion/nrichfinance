import Link from "next/link";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      Copyright © {new Date().getFullYear()} NRich Finance
    </div>
  );
};

export default Footer;
