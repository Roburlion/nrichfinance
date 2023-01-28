import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabase";

let firstName = null;
let lastName = null;
let addressLine1 = null;
let city = null;
let state = null;
let pinCode = null;

export default function Profile({ session }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLatestUserName();
    getLatestUserAddress();
  }, []);

  const getLatestUserName = async () => {
    const user = supabase.auth.user();
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .order("inserted_at", { ascending: false })
        .limit(1);
        
      firstName = data[0].firstname;
      lastName = data[0].lastname;

      if (error) throw error;
      setData(data);
    } catch (error) {
      console.log('getLatestUserName()\n' + error.message);
    } finally {
      setLoading(false);
    }
  };
    

  const getLatestUserAddress = async () => {
    const user = supabase.auth.user();
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user?.id)
        .order('id', { descending: true });

      address = data[0].address;
      city = data[0].city;
      state = data[0].state;
      pinCode = data[0].pin_code;

      if (error) throw error;
      setData(data);
    } catch (error) {
      console.log('getLatestUserAddress()\n' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Fetching Profile...</div>;
  }

  const handleDelete = async (id) => {
    try {
      const user = supabase.auth.user();
      const { data, error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", id)
        .eq("user_id", user?.id);
      fetchProfiles();
      if (error) throw error;
      alert("Profile deleted successfully");
    } catch (error) {
      console.log('handleDelete()\n' + error.message);
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      padding: '1rem 10%',
    }}>
        <h1>hello world</h1>
    </div>
  );
}
