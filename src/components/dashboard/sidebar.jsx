import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SidebarPage = () => {
  const topMenuItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: '/assets/icons/dashboard.svg'

    },
    {
      title: 'Chats',
      href: '/dashboard/chats',
      icon: '/assets/icons/chatnav.svg'
    },
    {
      title: 'Calls',
      href: '/dashboard/calls',
      icon: '/assets/icons/call.svg'
    },
  ]

  const bottomMenuItems = [
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: '/assets/icons/settings.svg'
    },
    {
      title: 'Logout',
      href: '/dashboard/logout',
      icon: '/assets/icons/logout.svg'
    },
  ]
  return (
    <main className="flex flex-col w-full h-full items-center p-5 bg-dashboard-primary-bg bg-opacity-80 backdrop-blur-sm rounded-lg shadow-neon">
      <Image
        className="rounded-full w-10"
        alt="Profile Picture"
        width={300}
        height={300}
        src="/assets/images/profile-pic.png"
      />
      <div className="flex flex-col items-center mt-10 gap-y-6">
        {
          topMenuItems.map((item, index) => (
            <div key={index}>
              <Link href={item.href}>
                <div className="flex justify-center items-center w-fit h-fit p-1 hover:bg-gradient-radial from-menu-choose from-30% to-menu-choose-fade to-50% rounded-full hover:shadow-menu-hover">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="w-4"
                  ></Image>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
      <div className="mt-auto flex flex-col gap-y-6">
        {
          bottomMenuItems.map((item, index) => (
            <div key={index}>
              <Link href={item.href}>
              <div className="flex justify-center items-center w-fit h-fit p-1 hover:bg-gradient-radial from-menu-choose from-30% to-menu-choose-fade to-50% rounded-full hover:shadow-menu-hover">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="w-4"
                ></Image>
              </div>
              </Link>
            </div>
          ))
        }
      </div>
    </main>
  )
}

export default SidebarPage