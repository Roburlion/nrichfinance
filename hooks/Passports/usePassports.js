import { supabase } from '../../utils/supabase'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';

export function usePassports(user) {
  const [passports, setPassports] = useState([]);

  async function fetchData(user) {
    try {
      const { data, error } = await getPassports(user.id);
      if (error) throw error;
      setPassports(data);
    } catch (error) {
      console.log('GET error\n\t', error.message);
    }
  }

  useEffect(() => {
    if(user) fetchData(user);
  }, [user]);
  
  return passports;
}

export async function getPassports(userId = null) {
  let { data, error } = await supabase
    .from("tbl_passports")
    .select("*")
    .eq("user_id", userId)
    .is('deleted', null)
    .order('id', { ascending: false })

  // const mock = {
  //   data: [{passport_number:'100000000001'}]
  // }
  // return mock
  return { data, error }
}

export function useAddPassports(user) {
  const [isAddingPassports, setIsAddingPassports] = useState(false);
  const supabase = useSupabaseClient();

  async function addPassports(event) {
    event.preventDefault();
    setIsAddingPassports(true);
    let tableRow = {
      user_id: user.id,
      [event.target[0].name]: event.target[0].value,
      [event.target[2].name]: event.target[2].value,
      [event.target[4].name]: event.target[4].value,
      [event.target[6].name]: event.target[6].value,
    }
    // console.log('addPassport tableRow', tableRow);
    try {
      const { error } = await supabase
        .from("tbl_passports")
        .insert(tableRow)
      if (error) throw error;
    } catch (error) {
      console.log('POST error\n\t', error.message);
    } finally {
      setIsAddingPassports(false);
    }
  }

  return { addPassports, isAddingPassports };
}

/*
  const NONE = 'ba65dc5d-5278-4e6e-915b-ad555f5d0f2a'
  const ONE = '808eec08-136d-45de-86dc-bb28310a8119'
  const MANY = '5b35f1c7-1738-4583-b9d3-a365278236e2'
*/