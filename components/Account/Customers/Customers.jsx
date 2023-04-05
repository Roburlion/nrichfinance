// Customers.jsx
import CustomersUI from "./CustomersUI";
import { useUser } from "@supabase/auth-helpers-react";
import { useCustomers, useAddCustomers } from "../../../hooks/Customers/useCustomers";

export default function Customers() {
  const user = useUser();
  const data = useCustomers(user);
  const { addCustomers } = useAddCustomers(user);

  return (
    <>
      <CustomersUI data={data} handleSubmit={addCustomers} />
    </>
  )
}
  
