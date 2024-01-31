import React from 'react'
import Select from 'react-select'

export const SingleSelect = ({
  options,
  placeholder,
  onChange,
  field,
  form: { touched, errors, setFieldValue }
}) => {
  return (
    <Select
      className='w-full'
      onChange={option => setFieldValue(field.name, option.value)}
      name={field.name}
      placeholder={placeholder}
      options={options.map(item => ({
        value: item.id,
        label: item.name
      }))}
    />
  )
}
