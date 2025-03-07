import type { ExternalLinkUrl } from '~web/config/app'

type LinkProps = React.ComponentProps<'a'>

type ExternalLinkProps = {
  href: ExternalLinkUrl
  openInNewTab?: boolean
} & Omit<LinkProps, 'target' | 'rel' | 'href'>

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  openInNewTab = true,
  ...props
}) => (
  <a
    {...(openInNewTab ? { target: '_blank', rel: 'noreferrer' } : {})}
    {...props}
  />
)
