import React from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import SettingsComponent from '@/components/settings/settingsComponent'

const SettingsPage = () => {
  return (
    <DashboardLayout backgroundLayout={'dashboard-primary-bg'}>
      <main className="w-full h-full">
        <SettingsComponent />
      </main>
    </DashboardLayout>
  )
}

export default SettingsPage
