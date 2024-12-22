import React from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import CharacterCard from '@/components/dashboard/calls/characterCard'

const page = () => {
  return (
    <DashboardLayout backgroundLayout="dashboard-primary-bg">
      <main className="flex flex-col w-full h-full py-7 px-10">
        <p className="text-xl font-bold">Choose Your Characters</p>
        <div className="mt-10">
          <CharacterCard />
        </div>
      </main>
    </DashboardLayout>
  )
}

export default page