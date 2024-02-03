'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginAsync } from '@/store/authAsyncActions'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import * as yup from 'yup'

const SignupSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('please input email'),
  password: yup.string().required('Required').min(5)
})

const LoginPage = () => {
  const { isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()
  const handleLogin = async (values, action) => {
    const res = await dispatch(loginAsync(values))
    if (res.payload !== undefined) {
      toast.success('Login success')
      router.push('/')
    } else {
      toast.warning(res.error.message)
    }
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={(values, actions) => handleLogin(values, actions)}
      validationSchema={SignupSchema}
    >
      {({ dirty }) => {
        return (
          <Form>
            <Card className='w-[350px]'>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Dashboard management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid w-full items-center gap-4'>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>Email</Label>
                    <Field name='email' type='email' component={Input} />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label>Password</Label>
                    <Field name='password' type='password' component={Input} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button disabled={!dirty || isLoading} type='submit'>
                  Login
                </Button>
              </CardFooter>
            </Card>
          </Form>
        )
      }}
    </Formik>
  )
}

export default LoginPage
