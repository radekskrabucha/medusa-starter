import { ExternalLinks } from '~web/config/app'
import { ExternalLink } from './ExternalLink'

export const SocialLinks = () => (
  <div className="flex flex-col gap-4">
    <h3 className="font-semibold">Find us on</h3>
    <div className="flex flex-col gap-2">
      <SocialLink href={ExternalLinks.Facebook}>Facebook</SocialLink>
      <SocialLink href={ExternalLinks.X}>X</SocialLink>
      <SocialLink href={ExternalLinks.Instagram}>Instagram</SocialLink>
    </div>
  </div>
)

type SocialLinkProps = Pick<
  React.ComponentProps<typeof ExternalLink>,
  'href' | 'children'
>

const SocialLink: React.FC<SocialLinkProps> = ({ href, children }) => (
  <ExternalLink
    href={href}
    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
  >
    {children}
  </ExternalLink>
)
