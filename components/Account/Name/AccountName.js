/*************************************************************************
 * 
 * This version WORKS!
 * 
 */
// TODO: change profile to personal_info and add fields for dob, passport number (or have this in a special table?), etc.

import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useEffect, useState } from 'react'
import { Paper } from '@mui/material';
import AccountNameForm from './AccountNameForm';

export default function AccountNameData() {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [nameData, setNameData] = useState()
  const [loading, setLoading] = useState(true);
  
  async function loadNameData() {
    try {
      setLoading(true);
      const { data, error } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .order('inserted_at', { ascending: false });

      if (error) throw error;
      // Stores most recent name in the form of formik.values      
      setNameData({
        firstname: data[0].firstname,
        lastname: data[0].lastname,
      })

    } catch (error) {
      console.log('select profile error\n\t', error.message);
    } finally {
      setLoading(false);
    }

  }
  
  // Loads names once user is logged in.
  useEffect(() => {
    if (!user) return
    loadNameData()
  }, [user])
  
  if (loading) return (
    <Paper
      sx={{
        padding: 2,
        margin: 2,
      }}
    > 
      <h1>loading...</h1>
    </Paper>
  )

  return (
    <AccountNameForm names={nameData} />
  );
}