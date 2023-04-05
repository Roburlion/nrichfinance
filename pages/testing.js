import { useUser } from "@supabase/auth-helpers-react"
import AadhaarCards from "../components/Account/AadhaarCards/AadhaarCards"

export default function Testing() {
  const user = useUser()

  return (
    <>
      <h1>Testing</h1>
      <p>{user?.email}</p>
      <hr/>
        <h2>Aadhaar</h2>
        <AadhaarCards/>
      <hr/>
      <p>
        Welcome to the fun!
      </p>
    </>
  )
}