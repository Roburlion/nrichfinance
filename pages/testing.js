import { useUser } from "@supabase/auth-helpers-react"
import PanCards from "../components/Account/PanCards/PanCards"

export default function Testing() {
  const user = useUser()

  return (
    <>
      <h1>Testing</h1>
      <p>{user?.email}</p>
      <hr/>
        <h2>Pan</h2>
        <PanCards/>
      <hr/>
      <p>
        Welcome to the fun!
      </p>
    </>
  )
}