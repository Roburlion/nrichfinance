import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import Phones from "../components/Account/Phones/Phones"

export default function Testing() {
  const supabase = useSupabaseClient()
  const user = useUser()

  return (
    <>
      <h1>Testing</h1>
      <p>{user?.email}</p>
      <hr/>
        <h2>Phones</h2>
        <Phones/>
      <hr/>
      <p>
        Welcome to the fun!
      </p>
    </>
  )
}