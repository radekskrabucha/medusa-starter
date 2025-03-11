import { createFileRoute } from '@tanstack/react-router'
import { PrivacyPolicyPage } from '~web/features/legal/PrivacyPolicyPage'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/privacy-policy')({
  component: PrivacyPolicyPage,
  head: () => ({
    meta: [...seo({ title: 'Privacy Policy' })]
  })
})
