'use client'

import { useEffect, useState } from 'react'
import { userList } from '@/app/api/users'
import { PageContainer } from '@/components/page-container'
import { useSelector } from 'react-redux'
import { UserTable } from './_components/user-table'

const UserPage = () => {
  const { token } = useSelector(state => state.auth)
  const [users, setUsers] = useState([])

  const pagination = async (page, filter) => {
    const res = await userList(token, page, filter)
    setUsers(res)
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userList(token)
        setUsers(res)
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchUser()
  }, [token])

  return (
    <PageContainer
      title='Users'
      description='Centralize user profiles, allowing for easy access to student and instructor information.'
    >
      <UserTable data={users.data} meta={users.meta} pagination={pagination} />
    </PageContainer>
  )
}

export default UserPage
