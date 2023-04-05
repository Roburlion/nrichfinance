// ! This test makes live API calls to the server. It's slow and flaky. Use it as a last resort.

import '@testing-library/jest-dom'
import { getPhones } from '../../hooks/Phones/usePhones'

const NONE = 'ba65dc5d-5278-4e6e-915b-ad555f5d0f2a'
const ONE = '808eec08-136d-45de-86dc-bb28310a8119'
const MANY = '5b35f1c7-1738-4583-b9d3-a365278236e2'

describe('env vars', () => {
  it('should have the url', () => {
    expect(process.env.NEXT_PUBLIC_SUPABASE_URL)
      .toBe('https://eobjtkqhhirmaykstnuo.supabase.co')
  })
})

describe('getPhones', () => {
  it('should return an empty array for NONE', async () => {
    const { data } = await getPhones(NONE)
    expect(data?.length).toBe(0)
  })

  it('should return ONE\'s phone number', async () => {
    const { data } = await getPhones(ONE)
    expect(data?.[0]?.phone_number).toBe('1234567890')
  })

  it('should return MANY\'s phone numbers', async () => {
    const { data } = await getPhones(MANY)
    expect(data?.length).toBe(3)
    expect(data?.[0]?.phone_number).toBe('2345678901')
    expect(data?.[1]?.phone_number).toBe('3456789012')
    expect(data?.[2]?.phone_number).toBe('3456789012')
  })

  it('should return an error for a bad id', async () => {
    const { error } = await getPhones('bad id')
    expect(error).toBeTruthy()
  })
})