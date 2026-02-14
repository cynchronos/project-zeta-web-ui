'use client'

import { createContext, useContext, useEffect, useRef } from "react";
import { initConversationSocket, disconnectConversationSocket } from "./initSocket";
import { useSelector } from "react-redux";

const ConversationContext = createContext();

export const ConversationSocketProvider = ({ children }) => {
  const socket = useRef(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token){
      if(!socket.current) {
        socket.current = initConversationSocket(token);
      }
    }else{
      if (socket.current) {
        disconnectConversationSocket(socket.current);
        socket.current = null;
      }
    }

    return () => {
      if (socket.current) {
        disconnectConversationSocket();
        socket.current = null;
      }
    };
  }, [token]);

  return (
    <ConversationContext.Provider value={socket}>
      {children}
    </ConversationContext.Provider>
  );
}

export const useConversationSocket = () => {
  return useContext(ConversationContext);
};