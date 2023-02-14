/* create a nextjs react page that pulls data from a supabase table named profiles with a crud mui form for profiles.firstname and profiles.lastname */

import { useState } from 'react';
import AccountName from '../components/Account/Name/AccountName';
import AccountAddress from '../components/Account/Address/AccountAddress';

export default function Account() {
  return (
    <div style={{
      width: '100%',
      height: 'auto',
      // minHeight: 'content',
      padding: '1rem 10%',
    }}>
      <h1>Welcome to your Account page</h1>
      <AccountName />
      <AccountAddress />
    </div>
  )
}