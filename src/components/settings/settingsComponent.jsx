'use client'
import React from 'react'
import Image from 'next/image'
import {
  MdVpnKey,
  MdTune
} from 'react-icons/md'
import { useGetProfileImage } from '@/hooks/accounts/useGetProfileImage'
import { useGetAccountQuery } from '@/lib/redux/api/slices/accountApi'

const SETTINGS_MENU = [
  {
    id: 'account',
    title: 'Account',
    subtitle: 'Security notifications, account info',
    icon: <MdVpnKey className="w-5 h-5" />
  },
  {
    id: 'preferences',
    title: 'Preferences',
    subtitle: 'Theme, language, formatting',
    icon: <MdTune className="w-5 h-5" />
  },
]

const SettingsComponent = () => {
  const { data: accountData, isLoading: isLoadingAccount } = useGetAccountQuery()
  const user = accountData?.data
  const { profileImageUrl } = useGetProfileImage(user?.profileImage)

  return (
    <div className="flex w-full h-full text-white">
      {/* Left Sidebar - Menu List */}
      <aside className="flex flex-col w-4/12 min-w-[300px] h-full border-r border-white-30 bg-sidebar-chat-bg">
        <div className="pt-6 px-4 pb-4">
          <h1 className="text-xl font-bold mb-6 px-2">Settings</h1>

          {/* Profile Card */}
          <div className="flex items-center bg-white/5 rounded-lg p-3 mb-6 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0 bg-gray-600">
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs">
                  {user?.displayName?.[0] || 'U'}
                </div>
              )}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-medium text-sm truncate">{user?.displayName || 'User'}</span>
              <span className="text-xs text-white/50 truncate">
                {user?.status || "I would never give up and someday, I'll go to you like the first snow"}
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col space-y-1">
            {SETTINGS_MENU.map((item) => (
              <div
                key={item.id}
                className="flex items-start p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
              >
                <div className="mt-0.5 text-white/50 group-hover:text-white transition-colors mr-4">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium mb-0.5">{item.title}</span>
                  <span className="text-xs text-white/50">{item.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Right Content - Static Logo */}
      <main className="flex-auto h-full flex flex-col items-center justify-center bg-transparent">
        <div className="flex flex-col items-center gap-4 opacity-100">
          <div className="relative w-24 h-24 mb-2">
            <Image
              src="/assets/icons/settings.svg"
              alt="Settings Logo"
              fill
              className="object-contain opacity-20"
            />
          </div>
          <p className="text-2xl font-normal text-white">Settings</p>
        </div>
      </main>
    </div>
  )
}

export default SettingsComponent
