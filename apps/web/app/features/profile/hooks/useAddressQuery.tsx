import { useQuery } from '@tanstack/react-query'
import { getAddressQueryOptions as getQueryOptions } from '../actions'

export const getAddressQueryOptions = (id: string) =>
  getQueryOptions({
    id,
    fields: {
      fields:
        'address_1,address_2,city,company,country_code,first_name,last_name,phone,postal_code,province,address_name,is_default_billing,is_default_shipping'
    }
  })

export const useAddressQuery = (id: string) => {
  return useQuery(getAddressQueryOptions(id))
}
