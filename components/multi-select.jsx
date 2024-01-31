import React from 'react'
import Select from 'react-select'

export const MultiSelect = ({ data, onChange, placeholder }) => {
  return (
    <Select
      onChange={onChange}
      isMulti
      closeMenuOnSelect={false}
      name='colors'
      placeholder={placeholder}
      options={data.map(item => ({ value: item.id, label: item.name }))}
    ></Select>
  )
}
