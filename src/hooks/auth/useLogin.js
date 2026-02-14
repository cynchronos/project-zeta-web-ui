import { useState } from 'react'
import { useLoginMutation } from '@/lib/redux/api/slices/accountApi'
import { useDispatch} from 'react-redux'
import { setCredentials } from '@/lib/redux/slices/authSlice'
import { useRouter } from 'next/navigation'

export const useLogin = () => {

  const router = useRouter()
  const dispatch = useDispatch()

  // call the login mutation
  const [login, { isLoading, isError, error }] = useLoginMutation()

  // local state for username and password
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })

  // handle input change
  function handleInputChange(e) {
    const { name, value } = e.target
    setLoginData({
      ...loginData,
      [name]: value
    })
  }

  // handle login
  async function handleLogin(e) {
    e.preventDefault()
    try {
      const userdata = await login(loginData).unwrap();
      dispatch(setCredentials(userdata.data))
      router.push('/dashboard')
      // console.log(userdata)
    } catch (error) {
      console.error('Failed to login:', error)
    }
  }


  return {
    loginData,
    isLoading,
    isError,
    error,
    handleInputChange,
    handleLogin
  }
}
