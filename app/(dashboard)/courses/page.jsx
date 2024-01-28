'use client'

import { CourseApi } from '@/app/api/courses-api'
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { PageContainer } from '@/components/page-container'

const CousePage = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    CourseApi.list(true)
      .then(res => {
        setCourses(res.data)
      })
      .catch(err => console.log(err.message))
  }, [])

  return (
    <PageContainer
      title='Courses'
      description='Manage course details, schedules, and enrollment capacities in real-time.'
      href='/courses/new'
    >
      <DataTable columns={columns} data={courses} />
    </PageContainer>
  )
}

export default CousePage
