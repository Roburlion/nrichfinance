// ! IMPORTS ------------------------------------------------------------------
// * MAIN IMPORTS -------------------------------------------------------------
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'example@email.com',
    password: 'example-password',
  });
}

function login() {
  return true;
}
// const supabaseClient = useSupabaseClient()
// const user = useUser()
function returnTrue() {
  return true;
}

it('should return true', () => {
  expect(returnTrue()).toBe(true);
});

it('should not return null', () => {

});