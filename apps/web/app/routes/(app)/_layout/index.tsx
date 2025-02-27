import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '~web/features/home/HomePage'

export const Route = createFileRoute('/(app)/_layout/')({
  component: HomePage
})
