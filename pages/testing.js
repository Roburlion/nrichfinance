import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import { getPhones } from "../hooks/Phones/usePhones"
import { useEffect, useState } from "react"
import PhonesUI from "../components/Account/Phones/PhonesUI"
import Phones from "../components/Account/Phones/Phones"

export default function Testing() {
  const supabase = useSupabaseClient()
  const user = useUser()

  // useEffect(() => {
  //   console.log("user", user)
  //   console.log("supabase", supabase)
  //   // console.log("getPhones", getPhones(supabase, user?.id))
  // }, [user, supabase])

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