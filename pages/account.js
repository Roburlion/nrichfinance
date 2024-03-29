// ! --------------------------------------------------------------------------
// TODO: Lift supabaseClient up to this page.
// TODO: Lift supabase auth useUser up to this page.
// TODO: Show 'permission denied' error message if user is not logged in.
// ! --------------------------------------------------------------------------

// * IMPORTS ------------------------------------------------------------------
// import AccountName from '../components/Account/Name/AccountName';
import Customers from '../components/Account/Customers/Customers';
import AccountAddress from '../components/Account/Address/AccountAddress';
import AadhaarCards from '../components/Account/AadhaarCards/AadhaarCards';
import PanCards from '../components/Account/PanCards/PanCards';
import Phones from '../components/Account/Phones/Phones';
import Passports from '../components/Account/Passports/Passports';

// * COMPONENT ----------------------------------------------------------------
export default function Account() {
  
  // * RETURN -----------------------------------------------------------------
  return (
    <div style={{
      width: '100%',
      height: 'auto',
      padding: '1rem 10%',
    }}>
      <h1>Welcome to your Account page</h1>
      <Customers />
      <Phones />
      <AccountAddress />
      <Passports />
      <PanCards />
      <AadhaarCards />
    </div>
  )
}