'use client'
import React from 'react'
import AuthLayout from '@/components/layouts/AuthLayout'
import RegisterBoxComponent from '@/components/auth/register/registerBoxComponent'

const page = () => {
  return (
    <AuthLayout>
      <RegisterBoxComponent />
    </AuthLayout>
  )
}

export default page