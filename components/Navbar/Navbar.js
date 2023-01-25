import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { supabase } from "../../utils/supabase";
import ScrollY from '../ScrollY/App'
import FadeIn from '../FadeIn/App'

import navLogo from "../../public/apple-touch-icon.png";

const Navbar = ({ session }) => {
  return (
    <div className={styles.container}>
      <div>
        <FadeIn />
      </div>
      
      <div>
        <ul className={styles.navContent}>
          <li className={styles.name}>
            <Link href="/about">
              About
            </Link>
          </li>
          {
            session?.user ?
            (
              <ul className={styles.navContent}>
                <Link href="/profile">
                  <li className={styles.name}>Profile</li>
                </Link>
                <button
                  className={styles.buttons}
                  onClick={() => supabase.auth.signOut()}
                >
                  Logout
                </button>
              </ul>
            ) :
            (
              <ul className={styles.navContent}>
                <Link href="/login">
                  <li className={styles.buttons}>Login</li>
                </Link>
                <Link href="/signup">
                  <li className={styles.buttons}>Signup</li>
                </Link>
              </ul>
            )
          }
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
