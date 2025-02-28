import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '~web/components/DefaultCatchBoundary'
import { NotFound } from '~web/components/NotFound'
import appCss from '~web/styles/app.css?url'
import { seo } from '~web/utils/seo'

const RootDocument: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html>
    <head>
      <HeadContent />
    </head>
    <body className="font-main text-foreground bg-background relative flex min-h-dvh w-full flex-col antialiased">
      {children}
      <TanStackRouterDevtools position="bottom-right" />
      <Scripts />
    </body>
  </html>
)

const RootComponent: React.FC = () => (
  <RootDocument>
    <Outlet />
  </RootDocument>
)

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      ...seo({ title: undefined })
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' }
    ]
  }),
  errorComponent: props => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent
})
