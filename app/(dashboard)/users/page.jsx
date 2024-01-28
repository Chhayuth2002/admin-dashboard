'use client'

import { DataTable } from './data-table'
import { columns } from './columns'
import { useEffect, useState } from 'react'
import { UsersApi } from '@/app/api/users-api'
import { PageContainer } from '@/components/page-container'

const UserPage = () => {
  const payments = [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com'
    },
    {
      id: '489e1d42',
      amount: 125,
      status: 'processing',
      email: 'example@gmail.com'
    }
  ]

  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = []
  // useEffect(() => {
  //   setIsLoading(true)

  //   UsersApi.getAll(true)
  //     .then(res => setUsers(res))
  //     .catch(err => console.log(err.message))
  // }, [])

  return (
    <PageContainer
      title='Users'
      description='Centralize user profiles, allowing for easy access to student and instructor information.'
    >
      <DataTable columns={columns} data={payments} />
    </PageContainer>
  )
}

export default UserPage
