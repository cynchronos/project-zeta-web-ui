'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import DialogComponent from './dialogComponent'
import { useSelector } from 'react-redux'
import { useConversationSocket } from '@/lib/sockets/conversationContext'
import { useGetMessagesQuery } from '@/lib/redux/api/slices/messageApi'
import { transformMessageData } from '@/utils/supabase/transfornMessageData'

const MessageComponent = ({ chat, messages, isLoading, isError, error }) => {
  const [openAttach, setOpenAttach] = useState(false)
  const [newInputMessage, setNewInputMessage] = useState('')
  const socketRef = useConversationSocket()

  function handleSendMessage() {
    if (newInputMessage != '') {
      const newMessage = {
        chat: chat.id,
        content: newInputMessage,
      }

      // console.log(newMessage)

      socketRef.current.emit('sendMessage', newMessage)

      setNewInputMessage('')
    }
  }

  function handleAttach() {
    setOpenAttach(!openAttach)
  }

  return !isLoading && chat && messages ? (
    <div className="grid grid-rows-9 2xl:grid-rows-11 w-full h-full">
      <div className="row-span-1">
        <div className="flex w-full h-full py-4 px-5 gap-2.5 items-center">
          <Image
            src={chat.profileImage}
            width={60}
            height={60}
            alt="pfp"
            className="rounded-full size-8 object-cover"
          />

          <div className="flex">
            <p className="text-sm text-white font-bold">{chat.title}</p>
            {
              chat.participants[0].onModel == 'CharacterModel' && (
                <p className="font-bold text-gray-500 text-sm pl-2">AI</p>
              )
            }
          </div>
        </div>
      </div>
      <div className="row-span-7 2xl:row-span-9">
        <DialogComponent dialogs={messages.data} />
      </div>
      <div className="row-span-1">
        <div className="flex gap-5 w-full h-full px-8 items-center">
          <div className="flex flex-col relative items-start">
            {/* Popup Attach Menu */}
            {openAttach && (
              <div className="absolute bottom-12 bg-popup-bg w-44 h-36  rounded-xl z-50">
                <div className="flex flex-col w-full h-full justify-center px-2 gap-y-2">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:bg-dark-contact-button hover:rounded-lg px-3 py-2">
                    <Image
                      src="/assets/icons/documents-solid.svg"
                      width={50}
                      height={50}
                      alt="camera"
                      className="size-6"
                    />
                    <p className="text-xs text-white font-mediup">Documents</p>
                  </div>
                  <div className="flex items-center gap-1.5 cursor-pointer hover:bg-dark-contact-button hover:rounded-lg px-3 py-2">
                    <Image
                      src="/assets/icons/photos.svg"
                      width={50}
                      height={50}
                      alt="camera"
                      className="size-6"
                    />
                    <p className="text-xs text-white font-mediup">Photos & Videos</p>
                  </div>
                  <div className="flex items-center gap-1.5 cursor-pointer hover:bg-dark-contact-button hover:rounded-lg px-3 py-2">
                    <Image
                      src="/assets/icons/audio-file.svg"
                      width={50}
                      height={50}
                      alt="camera"
                      className="size-6"
                    />
                    <p className="text-xs text-white font-mediup">Audio</p>
                  </div>
                </div>
              </div>
            )}

            {/* Button Attach */}
            <button onClick={() => handleAttach()}>
              <Image
                src="/assets/icons/attach.svg"
                width={50}
                height={50}
                alt="attach"
                className={`size-8 ${openAttach ? 'rotate-45' : 'rotate-0'} transition-transform`}
              />
            </button>
          </div>

          <div className="flex w-full px-4 bg-gray-input rounded-md">
            <div className="flex w-full py-2 2xl:py-3">
              <input
                type="text"
                placeholder="Type a message"
                className="w-full bg-transparent text-sm font-normal focus:outline-none placeholder:text-white-30 placeholder:font-medium"
                onChange={(inputMessage) => setNewInputMessage(inputMessage.target.value)}
                value={newInputMessage}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage()
                  }
                }} />
            </div>

            <div className="flex pl-2 py-1 items-center">
              <div className="w-7 h-7 2xl:w-9 2xl:h-9 flex justify-center items-center rounded-full px-1 cursor-pointer bg-gradient-to-tr from-green-spc-2 to-green-spc-1" onClick={() => handleSendMessage()}>
                <Image
                  src="/assets/icons/send.svg"
                  width={50}
                  height={50}
                  alt="send"
                  className="size-5 2xl-size-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  ) :
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <Image
          src="/assets/images/watermark-1.png"
          width={200}
          height={200}
          alt="chat"
          className="size-40 opacity-40"
        />
        <p className="text-2xl text-center font-bold text-watermark-text mt-8">Let’s Interact and Chat with Everyone</p>
      </div>
    </div>


}

export default MessageComponent