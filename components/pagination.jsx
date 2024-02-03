import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from './ui/pagination'
import { Button } from './ui/button'

const TablePagination = ({ handlePagination, meta, filter }) => {
  return (
    <div className='flex items-center justify-end space-x-2 py-4'>
      <div className='flex-1 text-sm text-muted-foreground'>
        total of {meta?.total} results
      </div>
      <div className='space-x-2'>
        <Pagination>
          {meta?.currentPage !== meta?.pages[0] && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePagination(meta.previous, filter)}
              />
            </PaginationItem>
          )}
          <PaginationContent>
            {meta?.pages.map(page => (
              <PaginationItem key={page}>
                <Button
                  onClick={() => handlePagination(page + 1, filter)}
                  variant={meta.currentPage === page ? 'outline' : 'ghost'}
                >
                  {page + 1}
                </Button>
              </PaginationItem>
            ))}

            {meta?.currentPage < meta?.pages[meta?.pages.length - 1] && (
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePagination(meta.next, filter)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default TablePagination
