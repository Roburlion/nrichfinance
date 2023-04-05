// ! This test makes live API calls to the server. It's slow and flaky. Use it as a last resort.

import '@testing-library/jest-dom'
import { getPassports } from '../../hooks/Passports/usePassports'

const NONE = 'ba65dc5d-5278-4e6e-915b-ad555f5d0f2a'
const ONE = '808eec08-136d-45de-86dc-bb28310a8119'
const MANY = '5b35f1c7-1738-4583-b9d3-a365278236e2'

describe('env vars', () => {
  it('should have the url', () => {
    expect(process.env.NEXT_PUBLIC_SUPABASE_URL)
      .toBe('https://eobjtkqhhirmaykstnuo.supabase.co')
  })
})

describe('getPassports', () => {
  it('should return an empty array for NONE', async () => {
    const { data } = await getPassports(NONE)
    expect(data?.length).toBe(0)
  })

  it('should return ONE\'s passport', async () => {
    const { data } = await getPassports(ONE)
    expect(data?.[0]?.passport_number).toBe('AAAAA00001')
  })

  it('should return MANY\'s passports', async () => {
    const { data } = await getPassports(MANY)
    expect(data?.length).toBe(3)
    expect(data?.[0]?.passport_number).toBe('BBBBB00003')
    expect(data?.[1]?.passport_number).toBe('BBBBB00002')
    expect(data?.[2]?.passport_number).toBe('BBBBB00001')
  })

  it('should return an error for a bad id', async () => {
    const { error } = await getPassports('bad id')
    expect(error).toBeTruthy()
  })
})