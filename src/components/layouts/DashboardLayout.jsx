import React from 'react'
import SidebarPage from '../dashboard/sidebar'

const DashboardLayout = ({ children, backgroundLayout, isOpacity=true }) => {
  return (
    <main className="w-screen h-screen bg-dashboard_bg bg-cover bg-center">
      <div className="flex flex-col w-full h-full justify-center items-center p-10">
        <div className="flex w-full h-full gap-x-10">
          <aside><SidebarPage/></aside>
          <aside className={`grow flex flex-col w-full h-full bg-${backgroundLayout} ${ isOpacity ? 'bg-opacity-80' : ''} backdrop-blur-sm rounded-lg shadow-neon overflow-y-auto`}>
            {children}
          </aside>
        </div>
      </div>
    </main>
  )
}

export default DashboardLayout