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
      alert(error.message);
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
        .order("inserted_at", { descending: true })
        .limit(1);

      addressLine1 = data[0].address_line_1;
      city = data[0].city;
      state = data[0].state;
      pinCode = data[0].pin_code;

      if (error) throw error;
      setData(data);
    } catch (error) {
      alert(error.message);
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
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.home}>
        {
          !session?.user ? 
          (
            <div>
              <p>To view your profile, please login or sign up.</p>
            </div>
          ) : 
          (
            <div>
              {
                data?.length === 0 ? 
                (
                  <div className={styles.noWorkout}>
                    <p>Please update your name</p>
                  </div>
                ) : 
                (
                  <div>
                    <h1>Profile</h1>
                    <p>
                      First name: {firstName}<br/>
                      Last name: {lastName}<br/>
                      Address line 1: {addressLine1}<br/>
                      City: {city}<br/>
                      State: {state}<br/>
                      Pin code: {pinCode}<br/>
                    </p>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  );
}
