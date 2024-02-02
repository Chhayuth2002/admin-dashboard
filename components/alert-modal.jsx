import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from './ui/alert-dialog'
import { Button } from './ui/button'

export const AlertModal = ({
  title,
  isOpen,
  onClose,
  id,
  onDelete,
  restoreUser,
  isSearchParam
}) => {
  const onChange = open => {
    if (!open) {
      onClose()
    }
  }

  if (!title === 'edit') {
    console.log(title)
  }

  const onConfirm = () => {
    onClose()
    onDelete(id)
  }

  const onRestore = () => {
    onClose()
    restoreUser(id)
    console.log(id)
  }

  let header = ''
  let des = ''

  let option

  if (isSearchParam) {
    header = 'Are you want to restore'
    des = 'This will retore user'

    option = onRestore
  } else {
    header = 'Are you sure you want to delete'
    des = 'This will delete user'

    option = onConfirm
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{header}</AlertDialogTitle>
          <AlertDialogDescription>{des}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
            <Button variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={option}>
              Continue
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
