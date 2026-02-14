import React from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ChatComponent from '@/components/chats/chatComponent'

const page = () => {
  return (
    <DashboardLayout backgroundLayout={'dashboard-primary-bg'}>
      <main className="w-full h-full">
        <ChatComponent/>
      </main>
    </DashboardLayout>
  )
}

export default page