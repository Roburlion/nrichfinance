import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabase";
import WorkoutCard from "../components/WorkoutCard";
import ProfileCard from "../components/ProfileCard";

export default function Profile({ session }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const user = supabase.auth.user();
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id);

      if (error) throw error;
      setData(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Fetching Profiles...</div>;
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
              <p className={styles.workoutHeading}>
                Hello <span className={styles.email}>{session.user.email}</span>,
                Welcome to your profile
              </p>
              <br/>
              <Link href="/create">
                <button className={styles.button}>
                  {" "}
                  Create a New Profile
                </button>
              </Link>
              {data?.length === 0 ? (
                <div className={styles.noWorkout}>
                  <p>You have no profiles yet</p>
                </div>
              ) : (
                <div>
                  <p className={styles.workoutHeading}>Here are your profiles</p>
                  <ProfileCard data={data} handleDelete={handleDelete} />
                </div>
              )}
            </div>
          )
        }
      </div>
    </div>
  );
}
