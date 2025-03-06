import { Button } from '@medusa-starter/ui/button'
import { useQuery } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { useSyncAuthToken } from '~web/hooks/useSyncAuthToken'
import { getMeQueryOptions } from '../auth/actions'

export const ProfilePage = () => {
  const token = useSyncAuthToken()
  const getMeQuery = useQuery(getMeQueryOptions(token))

  if (!token) {
    return redirect({
      to: '/sign-in'
    })
  }

  return (
    <section className="layout-section">
      <QueryBoundary query={getMeQuery}>
        {data => (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Profile details</h2>
              <Button variant="outline">Edit details</Button>
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="text-base text-gray-900">
                  {data.customer.first_name} {data.customer.last_name}
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-base text-gray-900">{data.customer.email}</p>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">
                  Phone number
                </h3>
                <p className="text-base text-gray-900">{data.customer.phone}</p>
              </div>
            </div>
          </div>
        )}
      </QueryBoundary>
    </section>
  )
}
