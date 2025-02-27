import { appName } from '~web/config/app'

export const seo = ({
  title,
  description,
  keywords,
  image
}: {
  title: string | undefined
  description?: string
  image?: string
  keywords?: string
}) => {
  const tags = [
    { title: getSeoTitle(title) },
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: '@tannerlinsley' },
    { name: 'twitter:site', content: '@tannerlinsley' },
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    ...(image
      ? [
          { name: 'twitter:image', content: image },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'og:image', content: image }
        ]
      : [])
  ]

  return tags
}

const getSeoTitle = (title: string | undefined) =>
  title ? `${title} | ${appName}` : appName
