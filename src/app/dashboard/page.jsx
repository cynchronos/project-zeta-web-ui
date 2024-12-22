import React from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'

const page = () => {
  return (
    <DashboardLayout backgroundLayout="dashboard-primary-bg">
      <main className="flex flex-col w-full h-full p-5">
        <p className="text-lg font-bold">Dashboard</p>
      </main>
    </DashboardLayout>
  )
}

export default page