import React from 'react'
import Select from 'react-select'

export const MultiSelect = ({ data, onChange }) => {
  return (
    <Select
      onChange={onChange}
      isMulti
      closeMenuOnSelect={false}
      name='colors'
      options={data.map(item => ({ value: item.id, label: item.name }))}
    ></Select>
  )
}
