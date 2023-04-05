// ! This test makes live API calls to the server. It's slow and flaky. Use it as a last resort.

import '@testing-library/jest-dom'
import { getAadhaarCards } from '../../hooks/AadhaarCards/useAadhaarCards'

const NONE = 'ba65dc5d-5278-4e6e-915b-ad555f5d0f2a'
const ONE = '808eec08-136d-45de-86dc-bb28310a8119'
const MANY = '5b35f1c7-1738-4583-b9d3-a365278236e2'

describe('env vars', () => {
  it('should have the url', () => {
    expect(process.env.NEXT_PUBLIC_SUPABASE_URL)
      .toBe('https://eobjtkqhhirmaykstnuo.supabase.co')
  })
})

describe('getAadhaarCards', () => {
  it('should return an empty array for NONE', async () => {
    const { data } = await getAadhaarCards(NONE)
    expect(data?.length).toBe(0)
  })

  it('should return ONE\'s phone number', async () => {
    const { data } = await getAadhaarCards(ONE)
<<<<<<< HEAD
=======
    console.log('DEBUGGER\n', data)
>>>>>>> ee83c13c1332a1958c113fb2bc601bc8dfbba59e
    expect(data?.[0]?.aadhaar_card_number).toBe('100000000001')
  })

  it('should return MANY\'s phone numbers', async () => {
    const { data } = await getAadhaarCards(MANY)
    expect(data?.length).toBe(3)
    expect(data?.[0]?.aadhaar_card_number).toBe('200000000003')
    expect(data?.[1]?.aadhaar_card_number).toBe('200000000002')
    expect(data?.[2]?.aadhaar_card_number).toBe('200000000001')
  })

  it('should return an error for a bad id', async () => {
    const { error } = await getAadhaarCards('bad id')
    expect(error).toBeTruthy()
  })
})