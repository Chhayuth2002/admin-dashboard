import CreatableSelect from 'react-select/creatable'

export const MultiSelect = ({
  field,
  options,
  form: { touched, errors, setValues }
}) => {
  const handleChange = (options, context) => {
    setValues(prev => {
      if (context.action === 'remove-value') {
        return {
          ...prev,
          [field.name]: options,
          removeTag: [...prev.removeTag, { id: context.removedValue.value }]
        }
      }
      return {
        ...prev,
        [field.name]: options
      }
    })
  }

  const mappedValue = field.value.map(item => ({
    value: item?.id ? item.id : item.value,
    label: item?.name ? item.name : item.label,
    __isNew__: item?.__isNew__ || false
  }))

  return (
    <div className='mt-3'>
      <CreatableSelect
        {...field}
        options={options.map(option => ({
          value: option.id,
          label: option.name
        }))}
        value={mappedValue}
        placeholder={field.placeholder}
        onChange={handleChange}
        noOptionsMessage={() => 'No tag'}
        isMulti={true}
        closeMenuOnSelect={false}
      />
      {touched[field.name] && errors[field.name] && (
        <div className='error mt-2 text-sm text-rose-500 italic'>
          {errors[field.name]}
        </div>
      )}
    </div>
  )
}
