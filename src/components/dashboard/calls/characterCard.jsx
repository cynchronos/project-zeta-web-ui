'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAppDispatch } from '@/lib/redux/hooks'
import { changeCall } from '@/lib/redux/slices/callSlice'
import { useSelector } from 'react-redux'
import { useGetChatsQuery } from '@/lib/redux/api/slices/chatApi'
import { useRouter } from 'next/navigation'
import { IoCall, IoSettingsSharp } from 'react-icons/io5'

const CharacterCard = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isClient, setIsClient] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { data: contactData } = useGetChatsQuery(undefined, { skip: !token || !isClient });

  useEffect(() => {
    setIsClient(true);
  }, []);

  function handleChooseContact(contact) {
    dispatch(changeCall(contact))
    router.push(`/dashboard/calls/${contact.id}`)
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-6">
      {contactData?.data?.map((contact, index) => (
        <div
          key={index}
          className="group relative flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
          onClick={() => handleChooseContact(contact)}
        >
          {/* Image Container */}
          <div className="relative mb-4">
            <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-white/10 to-white/5 ring-1 ring-white/10 group-hover:ring-white/30 transition-all duration-300">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-gray-800">
                <Image
                  src={contact.profileImage}
                  alt={contact.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
            {/* Active Status Dot */}
            <div className="absolute bottom-1 right-2 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#1a1a1a]" />
          </div>

          {/* Content */}
          <h3 className="text-lg font-bold text-white mb-1 text-center group-hover:text-blue-200 transition-colors w-full truncate px-2">{contact.title}</h3>
          <p className="text-white/40 text-xs mb-6 text-center line-clamp-1 w-full px-2">
            Tap to call
          </p>

          {/* Actions - Visible on hover or always visible but subtle */}
          <div className="flex items-center gap-3 w-full mt-auto opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all"
            >
              <IoCall className="text-green-400" /> Call
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Add settings logic here if needed
              }}
              className="flex items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all border border-white/5 hover:border-white/20"
            >
              <IoSettingsSharp className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))
      }
    </div>
  )
}

export default CharacterCard