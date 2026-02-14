import React from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import DialComponents from '@/components/dashboard/calls/dialComponent'

const DialPage = async ({
  params
}) => {
  const { roomId } = await params;
  return (
    <DashboardLayout backgroundLayout="dashboard-primary-bg" opacity={0}>
      <DialComponents roomId={roomId} />
    </DashboardLayout>
  )
}

export default DialPage