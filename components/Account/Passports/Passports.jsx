// Passports.jsx
import PassportsUI from "./PassportsUI";
import { useUser } from "@supabase/auth-helpers-react";
import { usePassports, useAddPassports } from "../../../hooks/Passports/usePassports";

export default function Passports() {
  const user = useUser();
  const data = usePassports(user);
  const { addPassports } = useAddPassports(user);

  return (
    <>
      <PassportsUI data={data} handleSubmit={addPassports} />
    </>
  )
}
  
