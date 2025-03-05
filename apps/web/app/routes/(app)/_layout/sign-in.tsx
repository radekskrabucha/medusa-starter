import { createFileRoute } from '@tanstack/react-router'
import { SignInPage } from '~web/features/auth/SignInPage'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/sign-in')({
  component: SignInPage,
  head: () => ({
    meta: [...seo({ title: 'Sign In' })]
  })
})
