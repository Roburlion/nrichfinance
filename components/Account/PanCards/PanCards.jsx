// PanCards.jsx
import PanCardsUI from "./PanCardsUI";
import { useUser } from "@supabase/auth-helpers-react";
import { usePanCards, useAddPanCards } from "../../../hooks/PanCards/usePanCards";

export default function PanCards() {
  const user = useUser();
  const data = usePanCards(user);
  const { addPanCards } = useAddPanCards(user);

  return (
    <>
      <PanCardsUI data={data} handleSubmit={addPanCards} />
    </>
  )
}
  
