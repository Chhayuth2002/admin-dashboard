'use client'

import { PageContainer } from '@/components/page-container'
import React from 'react'
import { UserForm } from './_components/user-form'

const UserPage = () => {
  return (
    <PageContainer
      title='Create user'
      description='Start by defining the fundamental details the users, including the name, email, and password.'
    >
      <UserForm />
    </PageContainer>
  )
}

export default UserPage
