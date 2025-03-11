import { createFileRoute } from '@tanstack/react-router'
import { TermsAndConditionsPage } from '~web/features/legal/TermsAndConditionsPage'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/terms-and-conditions')({
  component: TermsAndConditionsPage,
  head: () => ({
    meta: [...seo({ title: 'Terms and Conditions' })]
  })
})
