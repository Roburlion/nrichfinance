import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import { getPhones } from "../hooks/Phones/useGetPhones"
import { useEffect, useState } from "react"

export default function Testing() {
  const supabase = useSupabaseClient()
  const user = useUser()

  useEffect(() => {
    console.log("user", user)
    console.log("supabase", supabase)
    // console.log("getPhones", getPhones(supabase, user?.id))
  }, [user, supabase])

  return (
    <>
      <h1>Testing</h1>
      <p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </p>
      <hr/>
      <p>
        <pre>{JSON.stringify(getPhones(supabase, user?.id), null, 2)}</pre>
      </p>
      <hr/>
      <p>
        {process.env.NEXT_PUBLIC_SUPABASE_URL}
      </p>
      <p>
        {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}
      </p>
      {/* <Phones /> */}
    </>
  )
}