import { useQuery } from '@tanstack/react-query'
import { getMeQueryOptions as getQueryOptions } from '~web/features/profile/actions'
import { useSyncAuthToken } from '~web/hooks/useSyncAuthToken'

export const useGetMeQuery = () => {
  const token = useSyncAuthToken()
  const getMeQueryOptions = getQueryOptions(token)
  const getMeQuery = useQuery(getMeQueryOptions)

  return {
    getMeQuery,
    getMeQueryOptions,
    token
  }
}
