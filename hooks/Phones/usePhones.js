import { supabase } from '../../utils/supabase'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';

export function usePhones(user) {
  const [phones, setPhones] = useState([]);

  async function fetchPhones(user) {
    try {
      const { data, error } = await getPhones(user.id);
      if (error) throw error;
      setPhones(data);
    } catch (error) {
      console.log('select profile error\n\t', error.message);
    }
  }

  useEffect(() => {
    if(user) fetchPhones(user);
  }, [user]);
  // console.log('phones =>', phones);
  return phones;
}

export async function getPhones( userId = null) {
  let { data, error } = await supabase
    .from("tbl_phone_numbers")
    .select("*")
    .eq("user_id", userId)
    .is('deleted', null)
    .order('created', { ascending: false })
  // console.log('data\n', data, '\n\nerror\n', error)
  return { data, error }
}

export function useAddPhone(user) {
  const [isAddingPhone, setIsAddingPhone] = useState(false);
  const supabase = useSupabaseClient();

  async function addPhone(event) {
    event.preventDefault();
    setIsAddingPhone(true);
    const phoneNumber = event.target[0].value;

    try {
      const { error } = await supabase
        .from("tbl_phone_numbers")
        .insert({ 
          user_id: user.id, 
          phone_number: phoneNumber 
        })
      if (error) throw error;
    } catch (error) {
      console.log('addPhone: insert phone number error\n\t', error.message);
    } finally {
      setIsAddingPhone(false);
    }
  }

  return { addPhone, isAddingPhone };
}

/*
const NONE = 'ba65dc5d-5278-4e6e-915b-ad555f5d0f2a'
const ONE = '808eec08-136d-45de-86dc-bb28310a8119'
const MANY = '5b35f1c7-1738-4583-b9d3-a365278236e2'
[
  {
    id: 1,
    user_id: '808eec08-136d-45de-86dc-bb28310a8119',
    type: 1,
    dict_phone_country_codes_id: 1,
    phone_number: '1234567890',
    deleted: null,
    created: '2023-03-14T01:45:03.91158+00:00'
  },
  {
    id: 2,
    user_id: '808eec08-136d-45de-86dc-bb28310a8119',
    type: 1,
    dict_phone_country_codes_id: 1,
    phone_number: '5554567890',
    deleted: '2023-01-01T00:00:00',
    created: '2023-03-14T01:45:03.91158+00:00'
  },
  {
    id: 3,
    user_id: '5b35f1c7-1738-4583-b9d3-a365278236e2',
    type: 1,
    dict_phone_country_codes_id: 1,
    phone_number: '2345678901',
    deleted: null,
    created: '2023-03-14T01:45:03.91158+00:00'
  },
  {
    id: 4,
    user_id: '5b35f1c7-1738-4583-b9d3-a365278236e2',
    type: 2,
    dict_phone_country_codes_id: 1,
    phone_number: '3456789012',
    deleted: null,
    created: '2023-03-14T01:45:03.91158+00:00'
  },
  {
    id: 5,
    user_id: '5b35f1c7-1738-4583-b9d3-a365278236e2',
    type: 2,
    dict_phone_country_codes_id: 1,
    phone_number: '3456789012',
    deleted: null,
    created: '2023-03-14T01:45:03.91158+00:00'
  },
  {
    id: 6,
    user_id: '5b35f1c7-1738-4583-b9d3-a365278236e2',
    type: 2,
    dict_phone_country_codes_id: 1,
    phone_number: '3456789012',
    deleted: '2023-01-01T00:00:00',
    created: '2023-03-14T01:45:03.91158+00:00'
  }
]
*/