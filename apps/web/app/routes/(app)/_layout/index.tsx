import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '~web/features/home/HomePage'
import { seo } from '~web/utils/seo'

export const Route = createFileRoute('/(app)/_layout/')({
  component: HomePage,
  head: () => ({
    meta: [...seo({ title: 'Home' })]
  })
})
