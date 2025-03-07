import { QueryBoundary } from '~web/components/QueryBoundary'
import { useGetMeQuery } from '~web/features/auth/hooks/useGetMeQuery'
import { ProfileCard, ProfileCardNoUser } from './ProfileCard'

export const ProfileButton = () => {
  const { getMeQuery, token } = useGetMeQuery()

  return (
    <QueryBoundary
      query={getMeQuery}
      errorFallback={() => <ProfileCardNoUser />}
      noDataFallback={<ProfileCardNoUser />}
      loadingFallback={<ProfileCardNoUser disabled />}
    >
      {data => (
        <ProfileCard
          customer={data.customer}
          token={token}
        />
      )}
    </QueryBoundary>
  )
}
