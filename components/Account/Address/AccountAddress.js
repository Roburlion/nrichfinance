/*************************************************************************
 * 
 * This version WORKS!
 * 
 */

import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useEffect, useState, useRef } from 'react'
import { Paper } from '@mui/material';
import AccountAddressForm from './AccountAddressForm';

export default function AccountAddressData() {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [values, setValues] = useState()
  const [loading, setLoading] = useState(true);
  // ? For validating loaded data
  const dataNotLogged = useRef(true);
  
  // !* RENAME: load...Data()
  /***
   * Loads data from the supabase table named addresses into values.
   *  - user.id is included for supabase RLS.
   *  - is_deleted is included to filter out deleted records.
   *  - move_in is included to sort the records by most recent move in date.
   *  - data is returned in descending move_in date order.
   *  - data is returned as an array of objects.
   */
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

      // ? VALIDATE data
      // if (data && dataNotLogged.current) {
      //   dataNotLogged.current = false;
      //   console.log('loadAddressData() data: \n\t', data,)
      // }

      if (error) throw error;
      
      setValues(data)

    } catch (error) {
      console.log('select profile error\n\t', error.message);
    } finally {
      setLoading(false);
    }
  }
  
  // Loads names once user is logged in.
  useEffect(() => {
    if (!user) return
    loadAddressesData()
  }, [user])
  
  // if (loading) return (
  //   <Paper
  //     sx={{
  //       padding: 2,
  //       margin: 2,
  //     }}
  //   > 
  //     <h1>loading...</h1>
  //   </Paper>
  // )
  
  return (
    <Paper
      sx={{
        padding: 2,
        margin: 2,
      }}
    >
      <h2 style={{margin: '0', padding: '0'}}>{ !values ? 'Please enter an address' : 'Addresses'}</h2>
      {
        loading
        ? (
            <Paper
              sx={{
                padding: 2,
                margin: 2,
              }}
            > 
              <h1>loading...</h1>
            </Paper>
          )
        : (
            <>
              {values?.map((address, index) => {
                return (
                  <AccountAddressForm 
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
              <AccountAddressForm 
                address={{
                  address_number: values?.length ? values?.length + 1 : 1,
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
                  is_only_address: !values ? true : false,
                }}
              />
            </>
          )
      }
    </Paper>
  );
}