import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreVertical } from "lucide-react";
import { AlertModal } from "./alert-modal";
import { useSearchParams } from "next/navigation";

export const RowAction = ({ task, deleteUser, restoreUser }) => {
  const [open, setOpen] = useState(false);
  const searchParam = useSearchParams();

  const isSearchParam = searchParam.get("only_deleted");

  return (
    <>
      <AlertModal
        isSearchParam={isSearchParam}
        id={task}
        onDelete={deleteUser}
        restoreUser={restoreUser}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            {isSearchParam ? "Restore" : "Delete"}
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
