import { ExternalLinks } from '~web/config/app'
import { ExternalLink } from './ExternalLink'

export const SocialLinks = () => (
  <div className="flex flex-col gap-4">
    <h3 className="font-semibold">Find us on</h3>
    <div className="flex flex-col gap-2">
      <ExternalLink
        href={ExternalLinks.Facebook}
        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
      >
        Facebook
      </ExternalLink>
      <ExternalLink
        href={ExternalLinks.X}
        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
      >
        X
      </ExternalLink>
      <ExternalLink
        href={ExternalLinks.Instagram}
        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
      >
        Instagram
      </ExternalLink>
    </div>
  </div>
)
