import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://eobjtkqhhirmaykstnuo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvYmp0a3FoaGlybWF5a3N0bnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM5MzEwNDgsImV4cCI6MTk4OTUwNzA0OH0.zGTNwhd3bQB52-suLh6pH2z8BiL09sXOJJM07pQ_3-Y'
)

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