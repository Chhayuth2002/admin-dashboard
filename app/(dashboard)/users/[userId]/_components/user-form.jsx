import { SingleSelect } from '@/components/single-select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'

const SignupSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('please input email'),
  password: yup.string().required('Required').min(5)
})

export const UserForm = () => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: '',
        email: '',
        username: '',
        password: '',
        role: ''
      }}
      onSubmit={values => console.log(values)}
    >
      {({ values, dirty, resetForm, setValues }) => {
        return (
          <div className='bg-white p-3 rounded-md border'>
            <Form>
              <div className='flex gap-6 '>
                <Field name='name' component={Input} placeholder='Name' />
                <Field
                  name='username'
                  component={Input}
                  placeholder='Username'
                />
              </div>
              <div className='pt-4'>
                <Field name='email' component={Input} placeholder='Email' />
              </div>
              <div className='py-4'>
                <Field
                  name='password'
                  component={Input}
                  placeholder='Password'
                />
              </div>

              <Field
                name='password'
                component={SingleSelect}
                data={['admin', 'teacher', 'student']}
                placeholder='Password'
              />
              <Button className='mt-4' type='submit' disabled={!dirty}>
                Submit
              </Button>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}
