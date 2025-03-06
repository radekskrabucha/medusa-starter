import { buttonVariants } from '@medusa-starter/ui/button'
import { Link } from '@tanstack/react-router'
import { ProfilePageDetails } from './components/ProfilePageDetails'

export const ProfilePage = () => (
  <section className="layout-section gap-8 !self-start">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold">Profile details</h2>
      <Link
        to="/profile/edit"
        className={buttonVariants({ variant: 'outline' })}
      >
        Edit Profile
      </Link>
    </div>
    <ProfilePageDetails />
  </section>
)
