import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { supabase } from "../../utils/supabase";

import navLogo from "../../public/apple-touch-icon.png";

const Navbar = ({ session }) => {
  return (
    <div className={styles.container}>
      <div>
        <Link href="/">
          <Image src={navLogo} alt="navLogo" width={50} height={50} />
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
