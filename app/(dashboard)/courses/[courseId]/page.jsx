import { PageContainer } from '@/components/page-container'
import React from 'react'
import { CourseForm } from './_components/course-form'

const CoursePage = () => {
  return (
    <PageContainer
      title='Create course'
      description='Start by defining the fundamental details of your course, including the title, description, and objectives.'
    >
      <CourseForm />
    </PageContainer>
  )
}

export default CoursePage
