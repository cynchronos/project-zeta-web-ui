'use client'
import React from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import CharacterCard from '@/components/dashboard/calls/characterCard'

const CallsPage = () => {
  return (
    <DashboardLayout backgroundLayout="dashboard-primary-bg">
      <main className="flex flex-col w-full h-full py-8 px-10 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white tracking-wide mb-2">Start a Call</h1>
          <p className="text-white/50 text-base">Select a contact to start a new conversation.</p>
        </div>

        <div className="w-full">
          <CharacterCard />
        </div>
      </main>
    </DashboardLayout>
  )
}

export default CallsPage