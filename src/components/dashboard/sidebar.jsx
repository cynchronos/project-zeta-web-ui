'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { FiSidebar } from 'react-icons/fi'
import { useGetProfileImage } from '@/hooks/accounts/useGetProfileImage'
import { useLogoutMutation } from '@/lib/redux/api/slices/accountApi'
import { logout } from '@/lib/redux/slices/authSlice'
import { serverApi } from '@/lib/redux/api/serverApi'

// Menu items defined outside component to avoid re-creation on each render
const TOP_MENU_ITEMS = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: '/assets/icons/dashboard.svg',
  },
  {
    title: 'Chats',
    href: '/dashboard/chats',
    icon: '/assets/icons/chatnav.svg',
  },
  {
    title: 'Calls',
    href: '/dashboard/calls',
    icon: '/assets/icons/call.svg',
  },
]

const BOTTOM_MENU_ITEMS = [
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: '/assets/icons/settings.svg',
  },
]

// Icon wrapper size (used for consistent alignment)
const ICON_SIZE = 'w-6 h-6' // 24px — consistent anchor for all items
const PROFILE_SIZE = 'w-8 h-8' // 32px — consistent anchor for all items

// Reusable menu item component
const SidebarMenuItem = ({ item, isActive, isExpanded }) => (
  <Link href={item.href} className="w-full">
    <div className={`flex items-center rounded-lg transition-all duration-300 group relative py-2
      ${isExpanded ? 'gap-x-3 px-2' : 'justify-center'}`}
    >
      {/* Neon glow — centered on the icon */}
      <span
        className={`absolute ${ICON_SIZE} rounded-full bg-gradient-radial from-menu-choose from-30% to-menu-choose-fade to-50%
          transition-all duration-100 ease-out
          ${isExpanded ? 'left-2' : 'left-1/2 -translate-x-1/2'}
          ${isActive
            ? 'scale-150 opacity-100 shadow-menu-hover'
            : 'scale-0 opacity-0 group-hover:scale-150 group-hover:opacity-100 group-hover:shadow-menu-hover'
          }`}
      />
      {/* Icon — fixed size container */}
      <div className={`relative z-10 flex-shrink-0 flex justify-center items-center ${ICON_SIZE}`}>
        <Image
          src={item.icon}
          alt={item.title}
          width={100}
          height={100}
          className="w-4"
        />
      </div>
      {/* Label — only when expanded */}
      {isExpanded && (
        <span className={`relative z-10 text-sm whitespace-nowrap transition-opacity duration-300
          ${isActive ? 'text-menu-choose font-semibold' : 'text-white/70 group-hover:text-white'}`}
        >
          {item.title}
        </span>
      )}
    </div>
  </Link>
)

const SidebarPage = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation()

  const account = data?.data
  const { profileImageUrl, isLoading } = useGetProfileImage(account?.profileImage)

  // Load state from localStorage on mount
  React.useEffect(() => {
    const savedState = localStorage.getItem('sidebar_expanded')
    if (savedState !== null) {
      setIsExpanded(savedState === 'true')
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !isExpanded
    setIsExpanded(newState)
    localStorage.setItem('sidebar_expanded', newState)
  }

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return
    try {
      await logoutMutation().unwrap()
    } catch (err) {
      console.error('Backend logout failed:', err)
    } finally {
      dispatch(logout())
      dispatch(serverApi.util.resetApiState())
      router.push('/dashboard/login')
    }
  }, [isLoggingOut, logoutMutation, dispatch, router])

  return (
    <main
      className={`flex flex-col h-full bg-dashboard-primary-bg bg-opacity-80 backdrop-blur-sm rounded-lg shadow-neon
        transition-all duration-100 ease-in-out overflow-hidden py-5
        ${isExpanded ? 'w-48 px-2' : 'w-16 items-center'}`}
    >
      {/* Toggle button */}
      <div className={`flex items-center mb-6 ${isExpanded ? 'px-2' : 'justify-center'}`}>
        <button
          onClick={toggleSidebar}
          className={`flex-shrink-0 flex justify-center items-center ${ICON_SIZE} text-white/60 hover:text-menu-choose transition-colors duration-200`}
          title={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <FiSidebar className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Profile section */}
      <div className={`flex items-center mb-8 ${isExpanded ? 'gap-x-3 px-2' : 'justify-center'}`}>
        {profileImageUrl && !isLoading ? (
          <Image
            className={`rounded-full aspect-square object-cover flex-shrink-0 ${PROFILE_SIZE}`}
            alt="Profile Picture"
            width={24}
            height={24}
            src={profileImageUrl}
          />
        ) : (
          <div className="flex animate-pulse flex-shrink-0">
            <div className={`${PROFILE_SIZE} rounded-full bg-gray-600`}></div>
          </div>
        )}
        {isExpanded && (
          <div className="flex min-w-0 gap-x-1">
            <span className="text-xs text-white/50">Welcome,</span>
            <span className="text-xs text-white font-semibold truncate">
              {account?.displayName || 'User'}
            </span>
          </div>
        )}
      </div>

      {/* Top menu items */}
      <div className={`flex flex-col gap-y-1 ${isExpanded ? '' : 'items-center'} w-full`}>
        {TOP_MENU_ITEMS.map((item) => (
          <SidebarMenuItem
            key={item.href}
            item={item}
            isActive={pathname === item.href}
            isExpanded={isExpanded}
          />
        ))}
      </div>

      {/* Bottom menu items */}
      <div className={`mt-auto flex flex-col gap-y-1 ${isExpanded ? '' : 'items-center'} w-full`}>
        {BOTTOM_MENU_ITEMS.map((item) => (
          <SidebarMenuItem
            key={item.href}
            item={item}
            isActive={pathname === item.href}
            isExpanded={isExpanded}
          />
        ))}

        {/* Logout button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`w-full flex items-center rounded-lg transition-all duration-300 group relative py-2
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isExpanded ? 'gap-x-3 px-2' : 'justify-center'}`}
          title="Log Out"
        >
          <span
            className={`absolute ${ICON_SIZE} rounded-full bg-gradient-radial from-menu-choose from-30% to-menu-choose-fade to-50%
              transition-all duration-100 ease-out
              ${isExpanded ? 'left-2' : 'left-1/2 -translate-x-1/2'}
              scale-0 opacity-0 group-hover:scale-150 group-hover:opacity-100 group-hover:shadow-menu-hover`}
          />
          <div className={`relative z-10 flex-shrink-0 flex justify-center items-center ${ICON_SIZE}`}>
            <Image
              src="/assets/icons/logout.svg"
              alt="Log Out"
              width={100}
              height={100}
              className="w-4"
            />
          </div>
          {isExpanded && (
            <span className="relative z-10 text-sm whitespace-nowrap text-white/70 group-hover:text-white transition-opacity duration-300">
              Log Out
            </span>
          )}
        </button>
      </div>
    </main>
  )
}

export default SidebarPage