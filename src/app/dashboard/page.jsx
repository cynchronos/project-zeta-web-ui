import React from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'

const page = () => {
  return (
    <DashboardLayout backgroundLayout="dashboard-primary-bg">
      <main className="flex flex-col w-full h-full p-5">
        <p className="text-lg font-bold">Dashboard</p>
        {/* {
          !isClient || isLoading || isFetching ? (
            <aside className={`grow flex flex-col w-full h-full bg-${backgroundLayout} ${opacity ? 'bg-opacity-' + opacity : ''} backdrop-blur-xl rounded-lg shadow-neon overflow-y-auto text-white`}>
              <div className="w-full p-6 animate-pulse" aria-hidden="true">
                <div className="space-y-8">

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="h-32 rounded-lg bg-white/5"></div>
                    <div className="h-32 rounded-lg bg-white/5"></div>
                    <div className="h-32 rounded-lg bg-white/5"></div>
                    <div className="h-32 rounded-lg bg-white/5 hidden md:block lg:hidden"></div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 h-72 rounded-lg bg-white/5"></div>
                    <div className="h-72 rounded-lg bg-white/5"></div>
                  </div>

        <div className="rounded-lg bg-white/5 p-4 space-y-4">

        
          <div className="h-6 rounded bg-white/10 w-1/4"></div>
         
          <div className="space-y-3">
            <div className="h-4 rounded bg-white/10"></div>
            <div className="h-4 rounded bg-white/10"></div>
            <div className="h-4 rounded bg-white/10 w-5/6"></div>
          </div>
        </div>

      </div>
    </div>
            </aside >
          ) : (
  <div className=""></div>
)
        } */}
      </main >
    </DashboardLayout >
  )
}

export default page