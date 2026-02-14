import React, { useRef, useEffect } from 'react'
import BubbleDialog from './bubbleDialog'
import './messageStyle.css'


const DialogComponent = ({ dialogs }) => {
  const endOfMessage = useRef(null)

  useEffect(() => {
    if (endOfMessage.current) {
      endOfMessage.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
    , [dialogs])
  return (
    <div className="flex flex-col col w-full h-full overflow-y-auto message-scrollbar px-5 py-10 gap-5 bg-chat-dialog-container">
      {
        dialogs && dialogs.map((message, index) => (
          <BubbleDialog
            key={index}
            imagesSrc={message.sender.profileImage}
            senderId={message.sender.participantId}
            name={message.sender.profileName}
            message={message.content}
            type={message.sender.onModel}
          />
        ))
      }
      <div ref={endOfMessage} />
    </div>
  )
}

export default DialogComponent