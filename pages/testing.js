import { useUser } from "@supabase/auth-helpers-react"
import Customers from "../components/Account/Customers/Customers"

export default function Testing() {
  const user = useUser()

  return (
    <>
      <h1>Testing</h1>
      <p>{user?.email}</p>
      <hr/>
        <h2>Component in question:</h2>
        <Customers/>
      <hr/>
      <p>
        Welcome to the fun!
      </p>
    </>
  )
}