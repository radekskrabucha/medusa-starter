import { useQuery } from '@tanstack/react-query'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { getMeQueryOptions } from '~web/features/auth/actions'
import { useSyncAuthToken } from '~web/hooks/useSyncAuthToken'
import { ProfileCard, ProfileCardNoUser } from './ProfileCard'

export const ProfileButton = () => {
  const token = useSyncAuthToken()
  const getMeQuery = useQuery(getMeQueryOptions(token))

  return (
    <QueryBoundary
      query={getMeQuery}
      errorFallback={() => <ProfileCardNoUser />}
      noDataFallback={<ProfileCardNoUser />}
      loadingFallback={<ProfileCardNoUser disabled />}
    >
      {data => <ProfileCard customer={data.customer} />}
    </QueryBoundary>
  )
}
