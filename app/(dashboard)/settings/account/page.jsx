'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, Form, Formik } from 'formik'
import { Separator } from '@/components/ui/separator'

const AccountPage = () => {
  return (
    <div>
      <p className=' font-semibold text-lg'>Account</p>
      <span className='text-sm'>
        Update your account settings. Set your preferred language and timezone.
      </span>
      <Separator className='my-2' />
      <Formik initialValues={{ username: '', email: '' }}>
        <Form>
          <Field
            className='mt-4'
            name='username'
            placeholder='Username'
            component={Input}
          />
          <span className='text-xs'>
            This is the name that will be displayed on your profile and in
            emails.
          </span>

          <div>
            <Button className='mt-3 '>Update Profile</Button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default AccountPage
