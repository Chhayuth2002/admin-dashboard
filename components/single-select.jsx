import React from 'react'
import Select from 'react-select'

export const SingleSelect = ({ data, onChange }) => {
  return (
    <Select
      onChange={onChange}
      name='roles'
      options={data.map((item, index) => ({
        value: index,
        label: item.charAt(0).toUpperCase() + item.slice(1)
      }))}
    ></Select>
  )
}
