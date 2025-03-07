import { createFileRoute } from '@tanstack/react-router'
import { SignUpPage } from '~web/features/auth/SignUpPage'
import { signInSearchParamsSchema } from '~web/features/auth/validationSchemas'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute(
  '/(app)/_layout/_not_authenticated/sign-up'
)({
  component: SignUpPage,
  head: () => ({
    meta: [...seo({ title: 'Sign Up' })]
  }),
  validateSearch: signInSearchParamsSchema
})
