import { useQuery } from '@tanstack/react-query'
import { getMeQueryOptions as getQueryOptions } from '~web/features/profile/actions'

export const useGetMeQuery = () => {
  const getMeQueryOptions = getQueryOptions()
  const getMeQuery = useQuery(getMeQueryOptions)

  return {
    getMeQuery,
    getMeQueryOptions
  }
}
