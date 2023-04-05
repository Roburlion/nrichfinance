// ! --------------------------------------------------------------------------
// TODO: Lift supabaseClient up to this page.
// TODO: Lift supabase auth useUser up to this page.
// TODO: Show 'permission denied' error message if user is not logged in.
// ! --------------------------------------------------------------------------

// * IMPORTS ------------------------------------------------------------------
import AccountName from '../components/Account/Name/AccountName';
import AccountAddress from '../components/Account/Address/AccountAddress';
import AadhaarCards from '../components/Account/AadhaarCards/AadhaarCards';

import Phones from '../components/Account/Phones/Phones';

// * COMPONENT ----------------------------------------------------------------
export default function Account() {
  
  // * RETURN -----------------------------------------------------------------
  return (
    <div style={{
      width: '100%',
      height: 'auto',
      // minHeight: 'content',
      padding: '1rem 10%',
    }}>
      <h1>Welcome to your Account page</h1>
      <AccountName />
      <Phones />
      {/* <AccountPhone /> */}
      <AccountAddress />
      <AadhaarCards />
    </div>
  )
}