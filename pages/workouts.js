import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Workouts.module.css";
import navStyles from "../styles/Navbar.module.css";
import { supabase } from "../utils/supabase";
import WorkoutCard from "../components/WorkoutCard";

export default function Workouts({ session }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const user = supabase.auth.user();
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("workouts")
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
    return <div className={styles.loading}>Fetching Workouts...</div>;
  }

  const handleDelete = async (id) => {
    try {
      const user = supabase.auth.user();
      const { data, error } = await supabase
        .from("workouts")
        .delete()
        .eq("id", id)
        .eq("user_id", user?.id);
      fetchWorkouts();
      if (error) throw error;
      alert("Workout deleted successfully");
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
              <p>To view your account, please login or sign up.</p>
            </div>
          ) : 
          (
            <div>
              <p className={styles.workoutHeading}>
                Hello <span className={styles.email}>{session.user.email}</span>,
                Welcome to your dashboard
              </p>
              <br/>
              <Link href="/create">
                <button
                  className={navStyles.buttons}
                >
                  Create New Workout
                </button>
              </Link>
              {data?.length === 0 ? (
                <div className={styles.noWorkout}>
                  <p>You have no workouts yet</p>
                  <Link href="/create" legacyBehavior>
                    <button className={styles.button}>
                      {" "}
                      Create a New Workout
                    </button>
                  </Link>
                </div>
              ) : (
                <div>
                  <p className={styles.workoutHeading}>Here are your workouts</p>
                  <WorkoutCard data={data} handleDelete={handleDelete} />
                </div>
              )}
            </div>
          )
        }
      </div>
    </div>
  );
}
