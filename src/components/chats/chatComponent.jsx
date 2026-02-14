'use client'
import React, { useEffect, useState, useMemo } from 'react'
import { useConversationSocket } from '@/lib/sockets/conversationContext'
import ContactComponent from './contactComponent'
import MessageComponent from './messages/messageComponent'
import { useSelector } from 'react-redux'
import { useGetChatsQuery } from '@/lib/redux/api/slices/chatApi'
import { chatApi } from '@/lib/redux/api/slices/chatApi';
import { useAppDispatch } from '@/lib/redux/hooks'
import { useGetMessagesQuery } from '@/lib/redux/api/slices/messageApi'
import { transformMessageData } from '@/utils/supabase/transfornMessageData'

const ChatComponent = () => {
  const socketRef = useConversationSocket()
  const dispatch = useAppDispatch()
  const [isClient, setIsClient] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { data: chatsData, isLoading: isLoadingChats, isError: isErrorChats, error: errorChats } = useGetChatsQuery(undefined, { skip: !token || !isClient });
  const chat = useSelector((state) => state.chat.chatData)

  const queryParams = useMemo(() => ({
    chatRoom: chat ? chat.id : null,
    search: '',
    sortOrder: 'desc',
  }), [chat]);

  const { data: messagesData, isLoading: isLoadingMessages, isError: isErrorMessages, error: errorMessages } = useGetMessagesQuery(queryParams, { skip: !chat || !isClient });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    const handleNewChat = (newChat) => {
      dispatch(
        chatApi.util.updateQueryData('getChats', undefined, (draft) => {
          draft.data.unshift(newChat);
        })
      );
    };

    socket.on('newChat', handleNewChat);

    return () => {
      socket?.off('newChat', handleNewChat);
    };
  }, [dispatch, socketRef]);

  useEffect(() => {
    if (!socketRef.current || !queryParams.chatRoom) return;

    const socket = socketRef.current;

    socket.emit('joinChat', { chatRoom: queryParams.chatRoom })

    function handleNewMessage(message) {
      console.log('New message received:', message)

      dispatch(
        chatApi.util.updateQueryData('getMessages', queryParams, (draft) => {
          draft.data.push(transformMessageData(message));
        })
      )

      dispatch(
        chatApi.util.updateQueryData('getChats', undefined, (draft) => {
          const chatToUpdate = draft.data.find((c) => c.id === message.chat);

          if (chatToUpdate) {
            chatToUpdate.lastMessage = {
              sender: message.sender,
              content: message.content,
              sentAt: message.sentAt,
            }
          }

          draft.data = [
            chatToUpdate,
            ...draft.data.filter((c) => c.id !== message.chat)
          ]
        })
      )
    }

    socket.on('receivedMessage', handleNewMessage)

    return () => {
      socket.off('receivedMessage', handleNewMessage)
    };
  }, [dispatch, socketRef, queryParams]);

  return (
    <div className="flex w-full h-full">
      <aside className="flex flex-col w-3/12 min-w-[25%] h-full rounded-l-lg border-r border-white-30 bg-sidebar-chat-bg">
        <p className="font-bold text-xl pt-5 px-7">Chats</p>
        <ContactComponent chats={chatsData} loading={isLoadingChats} isError={isErrorChats} error={errorChats} />
      </aside>
      <aside className="flex-auto w-full h-full">
        <MessageComponent chat={chat} messages={messagesData} isLoading={isLoadingMessages} isError={isErrorMessages} error={errorMessages} />
      </aside>
    </div>
  )
}

export default ChatComponent