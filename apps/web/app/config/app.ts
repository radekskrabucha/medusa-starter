import type { StringWithAutoCompleteOptions } from '@medusa-starter/utils/types'

export const appName = 'Medusa Store'

export const ExternalLinks = {
  Facebook: 'https://www.facebook.com',
  Instagram: 'https://www.instagram.com',
  X: 'https://www.x.com'
} as const

export type ExternalLinks = typeof ExternalLinks
export type ExternalLink = keyof ExternalLinks
export type ExternalLinkUrl = StringWithAutoCompleteOptions<
  ExternalLinks[ExternalLink]
>
