import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table'
import { DatePicker } from '@/components/date-picker'
import { RowAction } from '@/components/row-action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import moment from 'moment'

export const DataTable = ({ data, meta, filterParams, category }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // get initial params key value
  const paramCat = searchParams
    ?.get("categories")
    ?.split(",")
    .map((item) => Number(item));

  const paramName = searchParams.get("name");
  const paramFrom = searchParams.get("from_date");
  const paramTo = searchParams.get("to_date");

  const [filters, setFilters] = useState({
    categories: paramCat,
    name: paramName || "",
    from_date: paramFrom || null,
    to_date: paramTo || null,
  });

  // change page
  const onChangePage = (page) => {
    filterParams(page, filters);
    paramsQuery("page", page);
  };

  // filter change
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  // filter categories
  const filterCategories = (categories) => {
    const categoriesIds = categories.map((item) => item.value);
    handleFilterChange("categories", categoriesIds);
    paramsQuery("categories", categoriesIds);
  };

  // filter name
  const filterName = (e) => {
    handleFilterChange("name", e.target.value);
    paramsQuery("name", e.target.value);
  };

  // filter date
  const onSelectDate = (field, date) => {
    const formatDate = moment(date).format("YYYY-MM-DD");
    console.log(formatDate);
    if (date !== undefined) {
      handleFilterChange(field, formatDate);
      paramsQuery(field, formatDate);
    }
  };

  // params
  const paramsQuery = (name, value) => {
    const params = new URLSearchParams(searchParams);
    // const arrayParams = []
    // add params
    if (Array.isArray(value)) {
      params.set(name, value.join(","));
    } else {
      params.set(name, value);
    }
    // remove params
    if (!value || (Array.isArray(value) && value.length === 0)) {
      params.delete(name, value);
    }

    router.push(pathname + "?" + params);

    // get params key and contruct a new query string with the key
    const queryString = Array.from(params.keys())
      .map((key) => `${key}=${params.get(key)}`)
      .join("&");

    const newUrl = `${pathname}?${queryString}`;

    router.push(newUrl, undefined, { scroll: false });
  };

  useEffect(() => {
    filterParams(meta?.currentPage || searchParams.get("page"), filters);
  }, [filters]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 p-2 border rounded-md w-full my-2 bg-white justify-between">
        <div className="flex justify-between gap-2">
          <Input
            value={filters.name ? filters.name : ""}
            onChange={filterName}
            placeholder="Filter name..."
          />
          <div className="flex gap-2">
            <DatePicker
              placeholder="From date"
              onSelectDate={onSelectDate}
              date={filters?.from_date}
              field="from_date"
            />
            <DatePicker
              placeholder="To date"
              onSelectDate={onSelectDate}
              date={filters?.to_date}
              field="to_date"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Select
            className="w-full"
            isMulti
            value={category.filter((item) =>
              filters.categories?.includes(item.value)
            )}
            closeMenuOnSelect={false}
            onChange={filterCategories}
            options={category}
          />
        </div>
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meta?.total > 0 ? (
              <>
                {data?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {new Date(item.created_at * 1000).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <RowAction />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          total of {meta?.total} results
        </div>
        <div className="space-x-2">
          <Pagination>
            {meta?.currentPage !== meta?.pages[0] && (
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => onChangePage(meta.previous)}
                />
              </PaginationItem>
            )}
            <PaginationContent>
              {meta?.pages.map((page) => (
                <PaginationItem key={page}>
                  <Button
                    onClick={() => onChangePage(page + 1)}
                    variant={meta.currentPage === page ? "outline" : "ghost"}
                  >
                    {page + 1}
                  </Button>
                </PaginationItem>
              ))}

              {meta?.currentPage < meta?.pages[meta?.pages.length - 1] && (
                <PaginationItem>
                  <PaginationNext onClick={() => onChangePage(meta.next)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};
