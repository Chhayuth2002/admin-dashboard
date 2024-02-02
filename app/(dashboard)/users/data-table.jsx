import { RowAction } from "@/components/row-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { object } from "yup";
import { userDelete, userRestore } from "@/app/api/users";
import { ChevronLeft } from "lucide-react";

export const DataTable = ({ data, meta, pagination }) => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [filter, setFilter] = useState({
    name: "" || searchParams?.get("name"),
    deleted: "",
    only_deleted: "",
  });
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    pagination(meta?.currentPage, filter);
    router.push(path + "?" + removeQueryString(filter));
  }, [filter]);

  const createQueryString = useCallback(
    (name, value) => {
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const removeQueryString = useCallback(
    (filter) => {
      Object.entries(filter).map(([key, value]) => {
        if (!value || value === "") {
          params.delete(key);
        }
      });

      return params.toString();
    },
    [searchParams]
  );

  const handleSearchChange = (value) => {
    setFilter((prev) => ({ ...prev, name: value }));
    router.push(path + "?" + createQueryString("name", value));
  };

  const handlePagination = (page, filter) => {
    pagination(page, filter);
    router.push(path + "?" + createQueryString("page", page));
  };

  const handleMenuSelect = (value) => {
    if (value === "1") {
      setFilter((prev) => ({ ...prev, deleted: "", only_deleted: "" }));
    }

    if (value === "2") {
      setFilter((prev) => ({ ...prev, deleted: "true", only_deleted: "" }));
      router.push(path + "?" + createQueryString("deleted", "true"));
    }

    if (value === "3") {
      setFilter((prev) => ({ ...prev, only_deleted: "true", deleted: "" }));
      router.push(path + "?" + createQueryString("only_deleted", "true"));
    }
  };

  const onDelete = async (id) => {
    try {
      const res = await userDelete(token, id);

      if (res) {
        toast.success(res.message);
      }

      pagination(meta?.currentPage, filter);
    } catch (error) {
      // toast.warning('Error deleting user')
      toast.warning(error?.response?.data?.message);
      console.log(error);
    }
  };

  const onRestore = async (id) => {
    try {
      const response = await userRestore(token, id);

      if (response) {
        toast.success("User restore successfully");
      }

      pagination(meta?.currentPage, filter);
    } catch (error) {
      toast.warning(error.response.data.message);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-4 bg-white p-2 my-2 rounded-md border gap-2 shadow-sm">
        <Input
          name="name"
          placeholder="Filter name or email..."
          className="max-w-5xl"
          value={filter.name || ""}
          onChange={(e) => handleSearchChange(e.target.value)}
        />

        <Select onValueChange={(value) => handleMenuSelect(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Users" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filter Users</SelectLabel>

              <SelectItem value="1">Default</SelectItem>
              <SelectItem value="2">With Deleted</SelectItem>
              <SelectItem value="3">Only Deleted</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border bg-white shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
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
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      <RowAction
                        task={item.id}
                        token={token}
                        deleteUser={onDelete}
                        restoreUser={onRestore}
                      />
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
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePagination(meta?.previous, filter)}
                />
              </PaginationItem>

              {meta?.pages?.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink href="#">
                    <Button
                      onClick={() => handlePagination(page + 1, filter)}
                      variant={meta.currentPage === page ? "outline" : "ghost"}
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
    </div>
  );
};
