import React from 'react'
import LoginLayout from '@/components/layouts/LoginLayout'

const login = () => {
  return (
    <LoginLayout>
      <div className='flex flex-col lg:w-6/12 xl:w-5/12  bg-[#111316]/40 filter backdrop-blur-md rounded-md items-center px-4 py-7'>
        <h1 className='text-lg font-bold'>Login</h1>
        <h3 className='text-sm font-semibold pt-3'>Please login with your account</h3>
        <form className='pt-5 flex flex-col items-center w-8/12'>
          <input type="text" placeholder='Username' className='w-full h-10 bg-[#181A1D]/60 border border-[#181A1D] rounded-md mt-4 p-2 text-white'/>
          <input type="password" placeholder='Password' className='w-full h-10 bg-[#181A1D]/60 border border-[#181A1D] rounded-md mt-4 p-2 text-white'/>
          <button className='w-fit bg-[#181A1D]/60 border border-[#181A1D] rounded-md mt-6 py-1 px-8 text-white'>Login</button>
        </form>
      </div>
    </LoginLayout>
  )
}

export default login