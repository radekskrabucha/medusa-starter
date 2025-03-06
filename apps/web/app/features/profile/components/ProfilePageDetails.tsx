import { getName } from '@medusa-starter/utils/name'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Building2, Lock, Mail, Phone, User2 } from 'lucide-react'
import { QueryBoundary } from '~web/components/QueryBoundary'
import { useSyncAuthToken } from '~web/hooks/useSyncAuthToken'
import { getMeQueryOptions } from '../actions'
import { ProfileDetailsTile } from './ProfileDetailsTile'

export const ProfilePageDetails = () => {
  const token = useSyncAuthToken()
  const getMeQuery = useQuery(getMeQueryOptions(token))

  return (
    <QueryBoundary query={getMeQuery}>
      {({
        customer: { phone, email, first_name, last_name, company_name }
      }) => (
        <div className="flex flex-col gap-6">
          <ProfileDetailsTile
            icon={<User2 className="size-4" />}
            title="Name"
            value={getName({
              firstName: first_name,
              lastName: last_name
            })}
            placeholder={
              <Link
                className="hover:text-foreground underline underline-offset-4 transition-colors"
                to="/profile/edit"
              >
                Set name
              </Link>
            }
          />

          <ProfileDetailsTile
            icon={<Mail className="size-4" />}
            title="Email"
            value={email}
            placeholder={
              <Link
                className="hover:text-foreground underline underline-offset-4 transition-colors"
                to="/profile/edit"
              >
                Set email
              </Link>
            }
          />

          <ProfileDetailsTile
            icon={<Phone className="size-4" />}
            title="Phone number"
            value={phone}
            placeholder={
              <Link
                className="hover:text-foreground underline underline-offset-4 transition-colors"
                to="/profile/edit"
              >
                Set phone number
              </Link>
            }
          />

          {company_name ? (
            <ProfileDetailsTile
              icon={<Building2 className="size-4" />}
              title="Company name"
              value={company_name}
            />
          ) : null}

          <ProfileDetailsTile
            icon={<Lock className="size-4" />}
            title={
              <>
                Password{' '}
                <span className="text-muted-foreground font-medium">
                  (
                  <Link
                    to="/profile/change-password"
                    className="hover:text-foreground underline underline-offset-4 transition-colors"
                  >
                    Change password
                  </Link>
                  )
                </span>
              </>
            }
            value="••••••••"
          />
        </div>
      )}
    </QueryBoundary>
  )
}
