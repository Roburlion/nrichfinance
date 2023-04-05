// ! This test makes live API calls to the server. It's slow and flaky. Use it as a last resort.

import '@testing-library/jest-dom'
import { getCustomers } from '../../hooks/Customers/useCustomers'

const NONE = 'ba65dc5d-5278-4e6e-915b-ad555f5d0f2a'
const ONE = '808eec08-136d-45de-86dc-bb28310a8119'
const MANY = '5b35f1c7-1738-4583-b9d3-a365278236e2'

describe('env vars', () => {
  it('should have the url', () => {
    expect(process.env.NEXT_PUBLIC_SUPABASE_URL)
      .toBe('https://eobjtkqhhirmaykstnuo.supabase.co')
  })
})

describe('getCustomers', () => {
  it('should return an empty array for NONE', async () => {
    const { data } = await getCustomers(NONE)
    expect(data?.length).toBe(0)
  })

  it('should return ONE\'s first name', async () => {
    const { data } = await getCustomers(ONE)
    expect(data?.[0]?.first_name).toBe('Alice')
  })

  it('should return MANY\'s first names', async () => {
    const { data } = await getCustomers(MANY)
    expect(data?.length).toBe(3)
    expect(data?.[0]?.first_name).toBe('Eliza')
    expect(data?.[1]?.first_name).toBe('Daria')
    expect(data?.[2]?.first_name).toBe('Crista')
  })

  it('should return an error for a bad id', async () => {
    const { error } = await getCustomers('bad id')
    expect(error).toBeTruthy()
  })
})