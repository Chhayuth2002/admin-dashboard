import { api } from '@/utils/axios'
import moment from 'moment/moment'

const formatDate = date => {
  return moment(date, 'YYYY-MM-DD', true).isValid()
    ? moment(date).format('YYYY-MM-DD')
    : null
}

export const courseList = async (page, filter, orderBy) => {
  const categoryIds = filter.categories.map(cat => cat.value)
  const fromDate = formatDate(filter.from_date)
  const toDate = formatDate(filter.to_date)

  const response = await api.get('/courses', {
    params: {
      category_ids: categoryIds,
      page,
      search: filter.name,
      order_by: orderBy,
      from_date: fromDate,
      to_date: toDate
    }
  })

  return response.data
}

export const courseShow = async id => {
  const response = await api.get(`/courses/${id}`)
  return response.data
}

export const courseCreate = async () => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('summary', data.summary)
  formData.append('image_url', data.image_url)
  formData.append('category_id', data.category_id)

  data.chapters.forEach((chapter, i) => {
    formData.append(`chapters[${i}][name]`, chapter.name)
    formData.append(`chapters[${i}][summary]`, chapter.summary)

    chapter.lessons.forEach((lesson, j) => {
      formData.append(`chapters[${i}][lessons][${j}][name]`, lesson.name)
      formData.append(`chapters[${i}][lessons][${j}][content]`, lesson.content)
      formData.append(
        `chapters[${i}][lessons][${j}][image_url]`,
        lesson.image_url
      )
    })
  })

  data.tags.forEach((tag, i) => {
    formData.append(`tags[${i}][value]`, tag.value)
    formData.append(`tags[${i}][label]`, tag.label)
    formData.append(`tags[${i}][__isNew__]`, tag.__isNew__)
  })

  const response = await api.post('/courses', formData)
  return response.data
}
