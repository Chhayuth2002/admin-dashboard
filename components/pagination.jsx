import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
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
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePagination(meta?.previous, filter)}
              />
            </PaginationItem>

            {meta?.pages?.map(page => (
              <PaginationItem key={page}>
                <PaginationLink href='#'>
                  <Button
                    onClick={() => handlePagination(page + 1, filter)}
                    variant={meta.currentPage === page ? 'outline' : 'ghost'}
                  >
                    {page + 1}
                  </Button>
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePagination(meta?.next, filter)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default TablePagination
