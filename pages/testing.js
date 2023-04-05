import { useUser } from "@supabase/auth-helpers-react"
import Passports from "../components/Account/Passports/Passports"

export default function Testing() {
  const user = useUser()

  return (
    <>
      <h1>Testing</h1>
      <p>{user?.email}</p>
      <hr/>
        <h2>Pan</h2>
        <Passports/>
      <hr/>
      <p>
        Welcome to the fun!
      </p>
    </>
  )
}