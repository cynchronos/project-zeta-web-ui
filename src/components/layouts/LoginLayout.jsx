import React from 'react'

const LoginLayout = ({ children }) => {
  return (
    <main className='w-screen h-screen bg-dashboard_bg bg-cover'>
      <div className="w-full h-full filter backdrop-blur-2xl bg-gradient-radial bg-black/30  flex flex-col justify-center items-center">
        {children}
      </div>
    </main>
  )
}

export default LoginLayout