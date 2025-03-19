import { useRef } from 'react'

export const useImageZoom = (borderThreshold = 25) => {
  const zoomRef = useRef<HTMLDivElement>(null)

  const handleMove = (x: number, y: number, container: DOMRect) => {
    if (!zoomRef.current) {
      return
    }

    const xPercent = ((x - container.left) / container.width) * 100
    const yPercent = ((y - container.top) / container.height) * 100

    if (
      xPercent < borderThreshold ||
      xPercent > 100 - borderThreshold ||
      yPercent < borderThreshold ||
      yPercent > 100 - borderThreshold
    ) {
      zoomRef.current.style.opacity = '0'
      return
    }

    zoomRef.current.style.backgroundPosition = `${xPercent}% ${yPercent}%`
    zoomRef.current.style.opacity = '1'
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect()
    handleMove(e.clientX, e.clientY, container)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (zoomRef.current) {
      zoomRef.current.style.opacity = '1'
    }

    const container = e.currentTarget.getBoundingClientRect()
    const touch = e.touches[0]

    if (!touch) {
      return
    }

    handleMove(touch.clientX, touch.clientY, container)
  }

  const handleTouchEnd = () => {
    if (zoomRef.current) {
      zoomRef.current.style.opacity = '0'
    }
  }

  return {
    handleMouseMove,
    handleTouchMove,
    handleTouchEnd,
    zoomRef
  }
}
