import { Button } from '@medusa-starter/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { getTailwindGap } from '~web/utils/styles'

type Header = {
  title: React.ReactNode
  description?: React.ReactNode
  controllers?: boolean
}

type SliderProps = {
  gap?: number
  children: React.ReactNode
  header?: Header
}

type SliderDirection = 'left' | 'right'

export const Slider: React.FC<SliderProps> = ({ children, header }) => {
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: SliderDirection) => {
    if (sliderRef.current) {
      const wrapper = sliderRef.current.firstElementChild as HTMLElement
      const sliderElement = wrapper.firstElementChild as HTMLElement
      const gap = getTailwindGap(wrapper.className)
      const scrollAmount = sliderElement.offsetWidth + (gap ? gap * 4 : 0)
      const scrollLeft = wrapper.scrollLeft
      const newScrollLeft =
        direction === 'left'
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount

      wrapper.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {header && (
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">{header.title}</h2>
            {header.description && (
              <p className="text-foreground-secondary">{header.description}</p>
            )}
          </div>
          {header.controllers && (
            <div className="ml-auto flex gap-4">
              <Button
                size="icon"
                variant="secondary"
                onClick={() => handleScroll('left')}
              >
                <ChevronLeft />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={() => handleScroll('right')}
              >
                <ChevronRight />
              </Button>
            </div>
          )}
        </div>
      )}
      <div ref={sliderRef}>{children}</div>
    </div>
  )
}
