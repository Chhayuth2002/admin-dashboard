import { logout } from '@/store/authSlice'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch()
  const { push } = useRouter()
  const { token, isLoading } = useSelector(state => state.auth)

  useEffect(() => {
    if (!token) {
      push('/login')
      dispatch(logout())
    }
  }, [token, push])

  if (!isLoading) {
    return
  }

  return children
}
