import React from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import DialComponents from '@/components/dashboard/calls/dialComponent'

const DialPage = () => {
  return (
    <DashboardLayout backgroundLayout="dashboard-primary-bg" isOpacity={false}>
      <DialComponents/>
    </DashboardLayout>
  )
}

export default DialPage