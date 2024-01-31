/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { X } from 'lucide-react'

export const InputFile = ({ field, form: { setFieldValue } }) => {
  const [selectedFile, setSelectedFile] = useState(null)

  if (field.value) {
    const file = field.value
    const reader = new FileReader()

    reader.onload = () => {
      setSelectedFile(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    setFieldValue(field.name, file)

    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        setSelectedFile(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='w-full'>
      <Input type='file' onChange={handleFileChange} />
      {selectedFile && (
        <div className='mt-2 relative'>
          <img
            src={selectedFile}
            alt='Preview'
            className='rounded-md object-cover'
          />
          <Button
            onClick={() => {
              setFieldValue(field.name, '')
              setSelectedFile(null)
            }}
            variant='icon'
            type='button'
            className='absolute top-0 right-0'
            aria-label='Remove image'
          >
            <X className='w-5 h-5' />
          </Button>
        </div>
      )}
    </div>
  )
}
