import React from 'react'
import AuthLayout from '@/components/layouts/AuthLayout'
import LoginBoxComponent from '@/components/auth/login/loginBoxComponent'

const login = () => {
  return (
    <AuthLayout>
      <LoginBoxComponent/>
    </AuthLayout>
  )
}

export default login