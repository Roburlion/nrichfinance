// Phones.jsx
import AadhaarCardsUI from "./AadhaarCardsUI";
import { useUser } from "@supabase/auth-helpers-react";
import { useAadhaarCards, useAddAadhaarCards } from "../../../hooks/AadhaarCards/useAadhaarCards";

export default function AadhaarCards() {
  const user = useUser();
  const data = useAadhaarCards(user);
  const { addAadhaarCards } = useAddAadhaarCards(user);

  return (
    <>
      <AadhaarCardsUI data={data} handleSubmit={addAadhaarCards} />
    </>
  )
}
  
