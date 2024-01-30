import React from 'react'
import Select from 'react-select'

export const SingleSelect = ({
  data,
  onChange,
  field,
  form: { touched, errors, setFieldValue }
}) => {
  return (
    <Select
      onChange={option => setFieldValue(field.name, option.value)}
      name={field.name}
      placeholder={field.placeholder}
      options={data.map(item => ({
        value: item,
        label: item.charAt(0).toUpperCase() + item.slice(1)
      }))}
    />
  )
}
