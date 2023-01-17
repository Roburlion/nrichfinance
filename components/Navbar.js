import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { supabase } from "../utils/supabase";

const Navbar = ({ session }) => {
  return (
    <div className={styles.container}>
      <div>
        <Link href="/">
          <Image src="/../public/apple-touch-icon.png" alt="logo" width={50} height={50} />
        </Link>
      </div>
      
      <div>
        <ul className={styles.navContent}>
          <Link href="/about">
            <li className={styles.name}>About</li>
          </Link>
          {
            session?.user ?
            (
              <ul className={styles.navContent}>
                <button
                  className={styles.buttons}
                  onClick={() => supabase.auth.signOut()}
                >
                  Logout
                </button>
                <Link href="/create">
                  <button
                    className={styles.buttons}
                  >
                    Create New Workout
                  </button>
                </Link>
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
