// ! NOTES --------------------------------------------------------------------
// TODO:

// ! IMPORTS ------------------------------------------------------------------
// * MAIN IMPORTS -------------------------------------------------------------
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useEffect, useState, useRef } from 'react'

// * MATERIAL UI IMPORTS ------------------------------------------------------
import { Paper } from '@mui/material';

// * COMPONENT IMPORTS --------------------------------------------------------
import AccountPhoneForm from './AccountPhoneForm';

// ! COMPONENTS ---------------------------------------------------------------
// * MAIN COMPONENT -----------------------------------------------------------
export default function AccountPhoneData() {
  // ! VARIABLES --------------------------------------------------------------
  // * SUPABASE VARIABLES -----------------------------------------------------
  const supabaseClient = useSupabaseClient()
  const user = useUser()

  // * STATE VARIABLES --------------------------------------------------------
  const [formData, setFormData] = useState()
  const [loading, setLoading] = useState(true);
  
  // * SUBSCRIBE TO CHANGES ---------------------------------------------------
  // console.log('supabaseClient.getChannels().length: \n\t', supabaseClient.getChannels().length)
  supabaseClient
    .channel('any')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tbl_phone_numbers' }, payload => {
      // console.log('Change received!', payload)
      loadData()
    })
    .subscribe()
  // console.log('supabaseClient.getChannels(): \n\t', supabaseClient.getChannels())

  // ! HELPER FUNCTIONS -------------------------------------------------------
  // * USE EFFECT HELPER FUNCTIONS --------------------------------------------
  async function loadData() {
    try {
      setLoading(true);
      const { data, error } = await supabaseClient
        // !* CHANGE: table name
        .from("tbl_phone_numbers")
        .select("*")
        .eq("user_id", user?.id)
        .is('deleted', null)
        .order('created', { ascending: false })

      if (error) throw error;
      
      setFormData(data)

    } catch (error) {
      console.log('select profile error\n\t', error.message);
    } finally {
      setLoading(false);
    }
  }
  
  // ! ------------------------------------------------------------------------
  // * USE EFFECTS ------------------------------------------------------------
  useEffect(() => {   // Loads names once user is logged in.
    if (!user) return
    loadData()
  }, [user])
  
  console.log('formData: \n\t', formData)

  // ! RENDER -----------------------------------------------------------------
  // * RETURN -----------------------------------------------------------------
  return (
    <Paper
      sx={{
        padding: 2,
        margin: 2,
      }}
    >
      <h2 style={{margin: '0', padding: '0'}}>
        Phone Numbers
      </h2>
      {
        loading
          ? <Paper
              sx={{
                padding: 2,
                margin: 2,
              }}
            > 
              <h1>loading...</h1>
            </Paper>
          : <>
              {formData?.map((phone, index) => {
                return (
                  <AccountPhoneForm 
                    key={phone.id} 
                    phone={{
                      // address_number: index + 1,
                      id: phone.id,
                      type: phone.type,
                      dict_phone_country_codes_id: phone.dict_phone_country_codes_id,
                      phone_number: phone.phone_number,
                      deleted: phone.deleted,
                      is_only_phone: false,
                    }}
                  />
                )
              })}
              <AccountPhoneForm 
                phone={{
                  // address_number: index + 1,
                  id: '',
                  type: '',
                  dict_phone_country_codes_id: '',
                  phone_number: '',
                  deleted: '',
                  is_only_phone: !formData ? true : false,
                }}
              />
            </>
      }
    </Paper>
  );
}