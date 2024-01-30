'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Field, Form, Formik } from 'formik'
import React from 'react'

const ProfilePage = () => {
  const onSave = (values, actions) => {
    console.log(values.username)
    console.log(values.email)
    actions.resetForm()
  }

  return (
    <div>
      <p className=' font-medium text-lg '>Profile</p>
      <Separator className='my-2' />
      <Formik initialValues={{ username: '', email: '' }} onSubmit={onSave}>
        <Form>
          <Field
            className='mt-4'
            name='username'
            placeholder='Username'
            component={Input}
          />
          <span className='text-xs'>
            This is your public display name. It can be your real name or a
            pseudonym. You can only change this once every 30 days.
          </span>

          <Field
            className='mt-4'
            name='email'
            placeholder='Email'
            component={Input}
          />
          <span className='text-xs'>
            You can manage your email addresses in Here.
          </span>

          <div>
            <Button className='mt-3 '>Update Profile</Button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default ProfilePage
