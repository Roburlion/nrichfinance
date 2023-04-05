// Phones.jsx
import PhonesUI from "./PhonesUI";
import { useUser } from "@supabase/auth-helpers-react";
import { usePhones, useAddPhone } from "../../../hooks/Phones/usePhones";

export default function Phones() {
  const user = useUser();
  const phones = usePhones(user);
  const { addPhone } = useAddPhone(user);

  return (
    <>
      <PhonesUI phones={phones} handleSubmit={addPhone} />
    </>
  )
}
  
