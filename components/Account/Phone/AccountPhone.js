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
export default function AccountAddressData() {
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
    .on('postgres_changes', { event: '*', schema: 'public', table: 'addresses' }, payload => {
      // console.log('Change received!', payload)
      loadAddressesData()
    })
    .subscribe()
  // console.log('supabaseClient.getChannels(): \n\t', supabaseClient.getChannels())

  // ! HELPER FUNCTIONS -------------------------------------------------------
  // * USE EFFECT HELPER FUNCTIONS --------------------------------------------
  async function loadAddressesData() {
    try {
      setLoading(true);
      const { data, error } = await supabaseClient
        // !* CHANGE: table name
        .from("addresses")
        .select("*")
        .eq("user_id", user?.id)
        .eq('is_deleted', false)
        .order('move_in', { ascending: false })

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
    loadAddressesData()
  }, [user])
  
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
        {
          !formData 
            ? 'Please enter an address' 
            : 'Addresses'
        }
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
              {formData?.map((address, index) => {
                return (
                  <AccountPhoneForm 
                    key={address.id} 
                    address={{
                      address_number: index + 1,
                      id: address.id,
                      address: address.address,
                      apartment: address.apartment,
                      city: address.city,
                      state: address.state,
                      pin_code: address.pin_code,
                      move_in: address.move_in,
                      move_out: address.move_out,
                      is_current_residence: address.is_current_residence,
                      is_deleted: address.is_deleted,
                      is_only_address: false,
                    }}
                  />
                )
              })}
              <AccountPhoneForm 
                address={{
                  address_number: formData?.length ? formData?.length + 1 : 1,
                  id: '',
                  address: '',
                  apartment: '',
                  city: '',
                  state: '',
                  pin_code: '',
                  move_in: '',
                  move_out: '',
                  is_current_residence: false,
                  is_deleted: false,
                  is_only_address: !formData ? true : false,
                }}
              />
            </>
      }
    </Paper>
  );
}