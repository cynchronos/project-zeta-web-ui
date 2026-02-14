'use client'
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import './chatStyle.css';
import { useAppDispatch } from '@/lib/redux/hooks';
import { changeChat } from '@/lib/redux/slices/chatSlice';
import ContactSearchModalComponent from './contactSearchModalComponent';


const ContactComponent = ({ chats, loading, isError, error }) => {
  const [searchChat, setSearchChat] = useState('');
  const dispatch = useAppDispatch()
  const skeletonArray = Array.from({ length: 10 });


  function handleChooseContact(contact) {
    dispatch(changeChat(contact))
  }

  const filteredChats = useMemo(() => {
    if (!chats || !chats.data) return [];

    const chatList = chats.data || [];

    if (searchChat.trim() === '') {
      return chatList;
    }

    const query = searchChat.toLowerCase();
    return chatList.filter((chat) =>
      chat.title.toLowerCase().includes(query)
    );
  }, [searchChat, chats]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="px-7 py-5">
        <div className="flex w-full gap-2.5 bg-dark-search-bar px-5 py-1 rounded-lg items-center">
          <Image
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
            className="size-4"
          />
          <input
            type="search"
            placeholder="Search"
            className="w-full bg-transparent text-xs focus:outline-none placeholder:text-white-30 placeholder:font-medium"
            value={searchChat}
            onChange={(e) => setSearchChat(e.target.value)}
          />
          <ContactSearchModalComponent />
        </div>
      </div>

      <div className="flex flex-col w-full h-full overflow-y-auto pb-2 border-b border-white-30 contact-scrollbar">
        {
          loading && filteredChats.length === 0 ?
            skeletonArray.map((_, index) => (
              <div key={index} className="flex px-4 w-full">
                <div className="flex items-center w-full px-3 py-3 gap-x-4">
                  <div className="rounded-full size-10 aspect-square bg-gray-700 animate-pulse" />
                  <div className="flex flex-col w-full gap-2">
                    <div className="h-4 bg-gray-700 rounded w-5/12 animate-pulse" />
                    <div className="h-3 bg-gray-700 rounded w-full animate-pulse" />
                  </div>
                </div>
              </div>
            )) :

            filteredChats.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full px-4 py-8">
                <p className="text-white-30 text-sm">No chats found</p>
              </div>
            ) :
              filteredChats.map((contact, index) => (
                <div key={index} className="flex px-4 w-full cursor-pointer" onClick={() => handleChooseContact(contact)}>
                  <div className="flex items-center w-full px-3 py-3 hover:bg-dark-contact-button hover:rounded-md">
                    <Image
                      src={contact.profileImage}
                      width={60}
                      height={60}
                      alt="pfp"
                      className="rounded-full size-10 object-cover"
                    />
                    <div className="flex flex-col pl-4 w-full overflow-hidden gap-y-1">
                      <div className="flex w-full gap-x-1">
                        <p className="font-bold text-white text-sm">{contact.title}</p>
                        {
                          contact.participants[0].onModel == 'CharacterModel' && (
                            <p className="font-bold text-gray-500 text-xs">AI</p>
                          )
                        }
                      </div>
                      <p className="text-xs text-contact-subtitle truncate">{contact.lastMessage?.content || ''}</p>
                    </div>
                  </div>
                </div>
              ))
        }
      </div>
    </div>
  )
}

export default ContactComponent