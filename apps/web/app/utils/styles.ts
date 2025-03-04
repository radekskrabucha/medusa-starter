export const getTailwindGap = (classString: string): number | null => {
  const match = classString.match(/gap-(\d+)/)
  if (!match) {
    return null
  }

  const gapValue = Number(match[1])
  return gapValue
}
