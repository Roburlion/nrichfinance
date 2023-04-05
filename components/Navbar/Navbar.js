import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./Navbar.module.css";
import FadeIn from './FadeIn/App'
import FadeOut from './FadeOut/App'

const Navbar = ({ session }) => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const router = useRouter();

  return (
    <div className={styles.global}>
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
              <Link href="/">
                Home
              </Link>
            </li>

            <li className={styles.name}>
              <Link href="/about">
                About
              </Link>
            </li>
            {
              user ?
              (
                <ul className={styles.navContent}>
                  <Link href="/account">
                    <li className={styles.name}>Account</li>
                  </Link>
                  <button
                    className={styles.buttons}
                    onClick={() => {
                      supabaseClient.auth.signOut();
                      router.push("/");
                    }}
                  >
                    Sign out
                  </button>
                </ul>
              ) :
              (
                <ul className={styles.navContent}>
                  <Link href="/login">
                    <li className={styles.buttons}>Sign in</li>
                  </Link>
                  <Link href="/login">
                    <li className={styles.buttons}>Sign up</li>
                  </Link>
                </ul>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
