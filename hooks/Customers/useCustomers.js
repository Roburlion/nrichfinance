import { supabase } from '../../utils/supabase'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';

export function useCustomers(user) {
  const [customers, setCustomers] = useState([]);

  async function fetchData(user) {
    try {
      const { data, error } = await getCustomers(user.id);
      if (error) throw error;
      setCustomers(data);
    } catch (error) {
      console.log('GET error\n\t', error.message);
    }
  }

  useEffect(() => {
    if(user) fetchData(user);
  }, [user]);
  
  return customers;
}

export async function getCustomers(userId = null) {
  let { data, error } = await supabase
    .from("tbl_customers")
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

export function useAddCustomers(user) {
  const [isAddingCustomers, setIsAddingCustomers] = useState(false);
  const supabase = useSupabaseClient();

  async function addCustomers(event) {
    event.preventDefault();
    setIsAddingCustomers(true);
    let tableRow = {
      user_id: user.id,
      [event.target[0].name]: event.target[0].value,
      [event.target[2].name]: event.target[2].value,
      [event.target[4].name]: event.target[4].value,
    }
    // console.log('addPassport tableRow', tableRow);
    try {
      const { error } = await supabase
        .from("tbl_customers")
        .insert(tableRow)
      if (error) throw error;
    } catch (error) {
      console.log('POST error\n\t', error.message);
    } finally {
      setIsAddingCustomers(false);
    }
  }

  return { addCustomers, isAddingCustomers };
}

/*
  const NONE = 'ba65dc5d-5278-4e6e-915b-ad555f5d0f2a'
  const ONE = '808eec08-136d-45de-86dc-bb28310a8119'
  const MANY = '5b35f1c7-1738-4583-b9d3-a365278236e2'
*/