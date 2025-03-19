import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  Tanstack
} from '@medusa-starter/ui/pagination'
import {
  getPaginationPageNumbers,
  type PaginationMeta
} from '@medusa-starter/utils/pagination'

type LinkPropsKeys = 'search' | 'params'
type LinkPropsRecord = Partial<
  Record<LinkPropsKeys, Record<string, string | number>>
>

type PaginationWithMetaProps = PaginationMeta & {
  to: string
  getQuery: (page: number) => LinkPropsRecord
}

export const PaginationWithMeta: React.FC<PaginationWithMetaProps> = ({
  page,
  limit,
  total,
  to,
  getQuery
}) => {
  const totalPages = Math.ceil(total / limit)

  if (totalPages <= 1) {
    return null
  }

  const pageNumbers = getPaginationPageNumbers(totalPages, page)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {/* @ts-expect-error - Tanstack Link shouts - we make sure to pass the correct props */}
          <Tanstack.Previous
            aria-disabled={page <= 1}
            className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
            to={to}
            {...getQuery(page - 1)}
          />
        </PaginationItem>

        {pageNumbers.map((pageNumber, index) => (
          <PaginationItem key={`${pageNumber}-${index}`}>
            {pageNumber === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              // @ts-expect-error - Tanstack Link shouts - we make sure to pass the correct props
              <Tanstack.Link
                isActive={pageNumber === page}
                {...getQuery(pageNumber)}
              >
                {pageNumber}
              </Tanstack.Link>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          {/* @ts-expect-error - Tanstack Link shouts - we make sure to pass the correct props */}
          <Tanstack.Next
            aria-disabled={page >= totalPages}
            className={
              page >= totalPages ? 'pointer-events-none opacity-50' : ''
            }
            {...getQuery(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
