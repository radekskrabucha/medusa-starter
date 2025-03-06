import { createFileRoute } from '@tanstack/react-router'
import { SignInPage } from '~web/features/auth/SignInPage'
import { signInSearchParamsSchema } from '~web/features/auth/validationSchemas'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute(
  '/(app)/_layout/_not_authenticated/sign-in'
)({
  component: SignInPage,
  head: () => ({
    meta: [...seo({ title: 'Sign In' })]
  }),
  validateSearch: signInSearchParamsSchema
})
