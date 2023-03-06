import { useRouter } from "next/router";
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import styles from '../styles/Login.module.css'

export default function Login () {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const router = useRouter();

  if (!user) {
    return (
      // <Auth supabaseClient={supabase} />
      <div className={ styles.container }>
        <div className={ styles.authWrapper }>
            <Auth
              redirectTo="http://localhost:3000/"
              appearance={{ theme: ThemeSupa }}
              theme='dark'
              supabaseClient={supabaseClient}
              providers={['github']}
              socialLayout="vertical"
            />
        </div>
      </div>
    )
  }
  router.push("/account");
}