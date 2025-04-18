import { Button } from '@medusa-starter/ui/button'
import { MenuIcon } from 'lucide-react'
import { useState } from 'react'
import { SideMenu } from './SideMenu'

export const HamburgerMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="-ml-2 justify-self-start">
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        size="icon"
        className="hover:bg-foreground/5 !size-8"
      >
        <MenuIcon className="size-5" />
      </Button>
      <SideMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}
