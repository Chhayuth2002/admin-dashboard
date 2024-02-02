import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { userShow } from "@/app/api/users";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Input } from "./ui/input";
export const FormModal = ({ edit, id, token, setEditUser, editUser }) => {
  const fetchUser = async (id) => {
    try {
      const response = await userShow(token, id);

      setEditUser(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(editUser);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          onClick={() => fetchUser(id)}
          className="p-2 w-full"
        >
          {edit}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4"></div>
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
        <DialogFooter>
          <Button onClick={() => console.log(data)} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
