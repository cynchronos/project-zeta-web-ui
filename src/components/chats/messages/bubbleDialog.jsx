import React from 'react'
import Markdown from 'react-markdown'
import Image from 'next/image'
import { useSelector } from 'react-redux'

const BubbleDialog = ({ imagesSrc, senderId, name, message, type }) => {
  const accountData = useSelector((state) => state.auth.account)
  return senderId !== accountData._id ? (
    <div className="flex justify-start">
      <div className="flex items-start gap-2.5">
        <Image
          className="size-6 rounded-full object-cover"
          src={imagesSrc}
          width={60}
          height={60}
          alt="reciverimage"
        />
        <div className="flex mt-3 flex-col whitespace-normal w-full max-w-lg leading-1.5 px-5 py-1 border-2 border-bubble-dialog-border1 rounded-e-xl rounded-es-xl bg-bubble-dialog-bg">
          {/* <div className="flex items-center space-x-2 rtl:space-x-reverse w-full">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-caption-1">{name}</span>
            <span className="text-xs justify-self-end font-normal text-gray-500 dark:text-gray-400">AI</span>
          </div> */}
          <div className="text-sm font-normal py-1.5 text-white break-words">
            <Markdown>{message}</Markdown>
          </div>
          {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span> */}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-end">
      <div className="flex items-start gap-2.5">
        <div className="flex flex-col whitespace-normal mt-3 w-full  max-w-lg leading-1.5 px-5 py-1 border-2 border-bubble-dialog-border2 rounded-s-xl rounded-ee-xl bg-bubble-dialog-bg">
          {/* <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse"> */}
          {/* <span className="text-sm font-semibold text-gray-900 dark:text-white">{name}</span> */}
          {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span> */}
          {/* </div> */}
          <div className="text-sm font-normal py-2.5 text-white break-words">
            <Markdown>{message}</Markdown>
          </div>
          {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span> */}
        </div>
        <Image
          className="size-6 rounded-full object-cover"
          src={imagesSrc}
          width={60}
          height={60} alt="sender image"
        />
      </div>
    </div>
  )

}

export default BubbleDialog