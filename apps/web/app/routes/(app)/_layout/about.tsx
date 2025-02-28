import { createFileRoute } from '@tanstack/react-router'
import { AboutPage } from '~web/features/about/AboutPage'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/about')({
  component: AboutPage,
  head: () => ({
    meta: [...seo({ title: 'About' })]
  })
})
