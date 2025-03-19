export type PaginationPageNumber = number | 'ellipsis'

export const getPaginationPageNumbers = (
  totalPages: number,
  currentPage: number
) => {
  const pages: Array<PaginationPageNumber> = []

  if (totalPages <= 3) {
    // Show all pages if 3 or fewer
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // Always show first page
  pages.push(1)

  if (currentPage > 3) {
    pages.push('ellipsis')
  }

  // Show current page and surrounding pages
  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    pages.push(i)
  }

  if (currentPage < totalPages - 2) {
    pages.push('ellipsis')
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return pages
}
