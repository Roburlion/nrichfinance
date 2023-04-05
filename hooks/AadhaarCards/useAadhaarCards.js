import { supabase } from '../../utils/supabase'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';

export function useAadhaarCards(user) {
  const [aadhaarCards, setAadhaarCards] = useState([]);

  async function fetchData(user) {
    try {
      const { data, error } = await getAadhaarCards(user.id);
      if (error) throw error;
      setAadhaarCards(data);
    } catch (error) {
      console.log('GET error\n\t', error.message);
    }
  }

  useEffect(() => {
    if(user) fetchData(user);
  }, [user]);
  return aadhaarCards;
}

export async function getAadhaarCards(userId = null) {
  let { data, error } = await supabase
    .from("tbl_aadhaar_cards")
    .select("*")
    .eq("user_id", userId)
    .is('deleted', null)
    .order('id', { ascending: false })

  // const mock = {
  //   data: [{aadhaar_card_number:'100000000001'}]
  // }
  // return mock
  return { data, error }
}

export function useAddAadhaarCards(user) {
  const [isAddingAadhaarCards, setIsAddingAadhaarCards] = useState(false);
  const supabase = useSupabaseClient();

  async function addAadhaarCards(event) {
    event.preventDefault();
    setIsAddingAadhaarCards(true);
    const aadhaarCardNumber = event.target[0].value;

    try {
      const { error } = await supabase
        .from("tbl_aadhaar_cards")
        .insert({ 
          user_id: user.id, 
          aadhaar_card_number: aadhaarCardNumber 
        })
      if (error) throw error;
    } catch (error) {
      console.log('POST error\n\t', error.message);
    } finally {
      setIsAddingAadhaarCards(false);
    }
  }

  return { addAadhaarCards, isAddingAadhaarCards };
}

/*
  const NONE = 'ba65dc5d-5278-4e6e-915b-ad555f5d0f2a'
  const ONE = '808eec08-136d-45de-86dc-bb28310a8119'
  const MANY = '5b35f1c7-1738-4583-b9d3-a365278236e2'
*/