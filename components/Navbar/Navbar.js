import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { supabase } from "../../utils/supabase";
import FadeIn from '../FadeIn/App'
import FadeOut from '../FadeOut/App'

const Navbar = ({ session }) => {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.fadeWrapper}>
          <div className={styles.fadeItem}>
            <FadeOut />
          </div>
          <div className={styles.fadeItem}>
            <FadeIn />
          </div>
        </div>
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
